import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN__NAME,
    USER_LOCALSTORAGE_DATA_NAME,
} from '../constant'
import { jwtUtil, localStore } from '../utils'

class AuthClient {
    public logout() {
        const accessToken = jwtUtil.getToken(ACCESS_TOKEN_NAME)
        const refreshToken = jwtUtil.getToken(REFRESH_TOKEN__NAME)
        const storage = localStore.getData(USER_LOCALSTORAGE_DATA_NAME)
        if (accessToken && refreshToken && storage) {
            jwtUtil.deleteToken(ACCESS_TOKEN_NAME)
            jwtUtil.deleteToken(REFRESH_TOKEN__NAME)
            localStore.deleteLocalStoreData(USER_LOCALSTORAGE_DATA_NAME)
            window.location.reload()
        }
    }

    public unEthicLogout() {
        window.location.reload()
    }
}

const authClient = new AuthClient()
export default authClient
