import { axiosInstance1 } from "../api/axiosInstance";

class UserService {
    public async changeUserFullName(userId: number, userNewFullName:string) {
        try {
            const response = await axiosInstance1.put(`/change-full-name/${userId}`,{userNewFullName});
            const data = await response.data;
        } catch(error) {

        }
    }
}

const userService = new UserService();
export default userService;