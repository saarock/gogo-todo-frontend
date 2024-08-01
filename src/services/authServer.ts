
import { axiosInstance1, axiosInstance2 } from '../api/axiosInstance'
import {
    Email,
    OtpResponse,
    RegisterRequest,
    RegisterResponseSuccess,
    User,
} from '../types'
import { errorUtil } from '../utils'

// authService.js
class AuthServer {
    async register(
        data: User,
        otp: bigint
    ): Promise<RegisterResponseSuccess | null> {
        const reigsterData: RegisterRequest = {
            user: {
                // it will get overwrite;
                id : 0,
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            },
            otp: otp,
        }

        try {
            const response = await axiosInstance1.post('/register', {
                ...reigsterData,
            })

            const responseData = await response.data
            if (responseData.status !== 'CREATED')
                throw new Error(responseData.message)
            return responseData
        } catch (error) {
            errorUtil.handelError(error)
            return null
        }
    }

    async sendMailForOtp(email: Email): Promise<OtpResponse | null> {
        try {
            const response = await axiosInstance1.post('/send-mail', {
                ...email,
            })
            const data = await response.data
            if (data.status !== 'OK') throw new Error(data.message)
            return data
        } catch (error) {
            errorUtil.handelError(error)
            return null
        }
    }

    async login(email: string, password: string): Promise<any> {
        try {
            const response = await axiosInstance1.post('/login', {
                email,
                password,
            })
            const data = await response.data
            if (data.status !== 'OK') throw new Error(data.message)
            return data
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }

    async isTokenValid(): Promise<boolean | Error> {
        try {
            const response = await axiosInstance1.post('/is-token-valid')
            const data = await response.data
            if (data.status !== 'ACCEPTED') throw new Error(data.message)
            return data.status === 'OK'
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }

    async generateAnotherAccessToken(
        token: string
    ): Promise<RegisterResponseSuccess | null> {
        try {
            const response = await axiosInstance2.post(
                '/generate-another-access-token-with-refreshtoken',
                {
                    token,
                }
            )
            const data = await response.data
            if (data.status !== 'OK') {
                throw new Error('Token Needed')
            }
            return data
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }

    public async resetPassword(email: string): Promise<string> {
        try {
            const response = await axiosInstance1.post('/reset-password', {
                email,
            })
            const data = await response.data
            if (data.status !== 'OK') throw new Error(data.message)
            return await data.email
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }

    // async saveProjectToTheDataBase(projects: )
}

export default new AuthServer()
