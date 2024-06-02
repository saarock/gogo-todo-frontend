// authService.js
class AuthServer {
  async register(data:any) {
    return data;
    // this.sendMailForOtp(data.email);
  }

  async sendMailForOtp(email:string) {
    return {type: "success"}
  }

  login(email:string, password: string) {
    // alert(email);
  }

  logout() {}

  // serverSideValidate({ refreshToken, accessToken }:any) {}
  refreshAccessToken(refreshToken: any) {}

  tookRefershTokenAndGetDataIfValid(token:any) {
    return true;
  }
}

export default new AuthServer();
