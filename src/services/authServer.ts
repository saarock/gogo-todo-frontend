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
      if (responseData.status !== "OK") throw new Error(responseData.message);
      return responseData;
    } catch (error) {
      throw new Error("Register failed");
    }
  }

  async sendMailForOtp(email: Email): Promise<OtpResponse | null> {
    try {
      const response = await axiosInstance1.post("/send-mail", { ...email });
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return data;
    } catch (error) {
      throw new Error("Cannot send OTP");
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axiosInstance1.post("/login", { email, password });
      const data = await response.data;
      console.log(data);
      if (data.status !== "OK") throw new Error(data.message);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async isTokenValid(): Promise<boolean | Error> {
    try {
      const response = await axiosInstance1.post("/is-token-valid");
      const data = await response.data;

      if (data.status !== "OK") throw new Error(data.message);
      return data.status === "OK";
    } catch (error) {
      throw new Error("Access Token expired");
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
