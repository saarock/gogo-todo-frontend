class JwtUtil {
  storeToken(tokenName: string, token: string): boolean {
    if (tokenName === "ACCESS") {
      // Calculate expiration dates
      const accessExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

      document.cookie = `${tokenName}=${token}; expires=${accessExpires.toUTCString()}; path=/;`;
    } else if (tokenName === "REFRESH") {
      const refreshExpires = new Date(Date.now() + 200 * 24 * 60 * 60 * 1000); // 200 days in milliseconds

      document.cookie = `${tokenName}=${token}; expires=${refreshExpires.toUTCString()};path=/;`;
    }

    return true;
  }

  getToken(tokenName: string): string | null {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(tokenName) === 0) {
        return cookie.substring(tokenName.length, cookie.length);
      }
    }
    return null;
  }

  deleteToken(tokenName: string) {
    document.cookie = `${tokenName}=; expires=; path=/;`;
  }
}


const jwtUtil = new JwtUtil();
export default jwtUtil;
