import axios from "axios";
import { axiosInstance1 } from "../api/axiosInstance";
import { User } from "../types";

class UserService {
    public async changeUserFullName(userId: number, userNewFullName:string):Promise<User> {
        try {
            const response = await axiosInstance1.put(`/change-fullname/${userId}`,{fullName: userNewFullName});
            const data = await response.data;
            if (data.status !== "OK") throw new Error(data.message);
            console.log("this is the data");
            console.log(data.data);
            
            return data.data;
        } catch(error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                  throw new Error(error.response.data.message);
                } else if (error.request) {
                  throw new Error(error.request.data.message);
                } else {
                  throw new Error("Error while Updating UserName");
                }
              } else {
                if (error instanceof Error) {
                  throw new Error(error.message);
                } else {
                  throw new Error("Failed to Update the fullname try again");
                }
              }
        }
    }
}

const userService = new UserService();
export default userService;