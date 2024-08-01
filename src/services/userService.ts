import axios from 'axios'
import { axiosInstance1 } from '../api/axiosInstance'
import { Review, User } from '../types'
import { errorUtil } from '../utils'
import toast from 'react-hot-toast'

class UserService {
    public async changeUserFullName(
        userId: number,
        userNewFullName: string
    ): Promise<User | null> {
        try {
            const response = await axiosInstance1.put(
                `/change-fullname/${userId}`,
                { fullName: userNewFullName }
            )
            const data = await response.data
            if (data.status !== 'OK') throw new Error(data.message)
            return data.data
        } catch (error) {
            errorUtil.handelError(error)
            return null
        }
    }

    public async changeUserGitHubUserName(
        userId: number,
        gitUserName: string
    ): Promise<User | null> {
        try {
            const response = await axiosInstance1.put(
                `/change-github-username/${userId}`,
                { gitUserName }
            )
            const data = await response.data
            if (data.status !== 'OK') throw new Error(data.message)
            return data.data
        } catch (error) {
            errorUtil.handelError(error)
            return null
        }
    }

    public async saveReview(review: Review): Promise<boolean> {
        try {
            const response = await axiosInstance1.post(
                `/save-what-users-said`,
                { ...review }
            )
            const data = await response.data
            if (data.status !== 'CREATED') throw new Error(data.message)
            return data.data
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }

    public async updatePassword(
        oldPassword: string,
        newPassword: string,
        email: string
    ): Promise<any> {
        try {
            const response = await axiosInstance1.put('/update-password', {
                email,
                oldPassword,
                newPassword,
            })
            const data = await response.data
            if (data.status !== 'CREATED') throw new Error(data.message)
            return data.data
        } catch (error) {
            errorUtil.handelError(error)
            throw error
        }
    }
}

const userService = new UserService()
export default userService
