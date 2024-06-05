import { ACCESS_TOKEN_NAME, REFRESH_TOKEN__NAME, USER_LOCALSTORAGE_DATA_NAME } from "../constant";
import { jwtUtil, localStore } from "../utils";

class AuthClient {
     public logout () {
          jwtUtil.deleteToken(ACCESS_TOKEN_NAME)
          jwtUtil.deleteToken(REFRESH_TOKEN__NAME)
          localStore.deleteLocalStoreData(USER_LOCALSTORAGE_DATA_NAME)
          window.location.reload()
     }
}

const authClient = new AuthClient();
export default authClient;