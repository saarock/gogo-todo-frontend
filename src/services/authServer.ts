import axiosInstance from "../api/api";
import { Email, RegisterRequest, User } from "../types";

// authService.js
class AuthServer {
  async register(data: User, otp: bigint) {
    const reigsterData: RegisterRequest = {
      user: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      otp: otp,
    };

    try {
      const response = await axiosInstance.post("/register", {
        ...reigsterData,
      });
      const responseData = await response.data;
      console.log(responseData);
      return responseData;
    } catch (error) {}
  }

  async sendMailForOtp(email: Email) {
    try {
      const resposne = await axiosInstance.post("/send-mail", { ...email });
      const data = await resposne.data;
      console.log(data);
      return data;
    } catch (error) {}
  }

  login(email: string, password: string) {
    // alert(email);
  }

  // serverSideValidate({ refreshToken, accessToken }:any) {}
  refreshAccessToken(refreshToken: any) {}

  tookRefershTokenAndGetDataIfValid(token: any) {
    return true;
  }

  async isTokenValid(accessToken: string): Promise<boolean> {
    try {
      const response = await axiosInstance.post("/is-token-valid", {
        accessToken: accessToken,
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}

export default new AuthServer();
