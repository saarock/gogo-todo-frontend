import { UN_AUTHORIZED_NAME } from '../constant.ts'

class ResponseServerUtil {
    public checkIsUnauthorized(
        currentMessageFromServiceServer: string
    ): boolean {
        return currentMessageFromServiceServer === UN_AUTHORIZED_NAME
    }
}

const responseServerUtil = new ResponseServerUtil()
export { responseServerUtil }
