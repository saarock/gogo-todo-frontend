import axios from 'axios'
import { responseServerUtil } from './responseServer.util.ts'
import authClient from '../services/authClient.ts'

class ErrorUtil {
    public handelError(error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const isUnauthorized = responseServerUtil.checkIsUnauthorized(
                    error.response.data.type
                )
                if (isUnauthorized) {
                    authClient.unEthicLogout()
                }
                throw new Error(error.response.data.message)
            } else if (error.request) {
                throw new Error(error.request.data.message)
            } else {
                throw new Error(
                    'Sorry something wrong try again by refreshing your page.'
                )
            }
        } else {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                authClient.unEthicLogout()
            }
        }
    }
}

const errorUtil = new ErrorUtil()
export default errorUtil
