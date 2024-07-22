import axios from "axios";
import { axiosInstance1 } from "../api/axiosInstance";
import { User } from "../types";
import {errorUtil} from "../utils";

class UserService {
    public async changeUserFullName(userId: number, userNewFullName:string):Promise<User | null> {
        try {
            const response = await axiosInstance1.put(`/change-fullname/${userId}`,{fullName: userNewFullName});
            const data = await response.data;
            if (data.status !== "OK") throw new Error(data.message);
            return data.data;
        } catch(error) {
            errorUtil.handelError(error);
            return null;
        }
    }
}

const userService = new UserService();
export default userService;