import axios from "axios";
import { axiosInstance1, axiosInstance2 } from "../api/axiosInstance";
import {
  Email,
  OtpResponse,
  RegisterRequest,
  RegisterResponseSuccess,
  User,
} from "../types";

// authService.js
class AuthServer {
  async register(
    data: User,
    otp: bigint
  ): Promise<RegisterResponseSuccess | null> {
    const reigsterData: RegisterRequest = {
      user: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      otp: otp,
    };

    try {
      const response = await axiosInstance1.post("/register", {
        ...reigsterData,
      });

      const responseData = await response.data;
      if (responseData.status !== "CREATED") throw new Error(responseData.message);
      return responseData;
    }  catch(error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return null;
        } else if (error.request) {
          return null;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
   
  }

  async sendMailForOtp(email: Email): Promise<OtpResponse | null> {
    try {
      const response = await axiosInstance1.post("/send-mail", { ...email });
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return data;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axiosInstance1.post("/login", { email, password });
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message)

        } else if (error.request) {
          throw new Error(error.request.data.message)
    
        } else {
          throw new Error("Cannot login contact gogo teams")
        }
       
     
      } 
      
    }
  }

  async isTokenValid(): Promise<boolean | Error> {
    try {
      const response = await axiosInstance1.post("/is-token-valid");
      const data = await response.data;
      if (data.status !== "ACCEPTED") throw new Error(data.message);
      return data.status === "OK";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message || "Token validation failed");
        } else if (error.request) {

          throw new Error("No response received from the server");
        } else {
  
          throw new Error("Error setting up the request");
        }
      } else {
        // Handle non-Axios errors
        console.error('Unexpected error:', error);
        throw new Error("Unexpected error occurred hah");
      }
    }
  }

  async generateAnotherAccessToken(
    token: string
  ): Promise<RegisterResponseSuccess | null> {
    try {
      const response = await axiosInstance2.post(
        "/generate-another-access-token-with-refreshtoken",
        {
          token,
        }
      );
      const data = await response.data;
      if (data.status !== "OK") {
        throw new Error("Token Needed");
      }
      return data;
    } catch (error) {
      throw new Error("Token expired");
    }
  }

  // async saveProjectToTheDataBase(projects: )
}

export default new AuthServer();
