import toast from "react-hot-toast";
import { axiosInstance1, axiosInstance2 } from "../api/axiosInstance";
import { Board, Project, Task } from "../types";

class ProductServerService {
  public async createNewProduct(newProduct: Project) {
    try {
 
     
      const response = await axiosInstance1.post("/create-new-product", {
        ...newProduct,
      });
     
     
      const data = await response.data;
      console.log("this is the data")
      console.log(data);
      if (data.status !== "OK") {
        throw new Error(data.message);
      }

      // do something to that data
      toast.success(`${newProduct.name} Project Created`);
      return data.data;
    } catch (error) {
  
      throw new Error(error instanceof Error ? error.message : "Unknown Error while creating the project");

    }
  }

  public async getProducts(userID: string, page: number) {
    try {
      const userNumberId = Number(userID);
      // Make the API request to fetch products
      const response = await axiosInstance1.get(
        `get-products?page=${page}&size=2&sortBy=updatedAt&direction=desc&userId=${userNumberId}`
      );
      const data = await response.data;

      console.log("this is the data");
      
      console.log(data)
      if (data.status !== "OK")
        throw new Error(data.message);
      console.log(data.data.content)
      return data.data.content;
    } catch (error) {
      // Handle any errors that occur during the API request
      throw new Error(error instanceof Error ? error.message : "Unknown error while fetching board");
    }
  }

  public async createNewBoard(board: Board) {
    try {
      const response = await axiosInstance1.post("/create-board", { ...board });
      const data = await response.data;
      if (data.status !== "OK")
        throw new Error("Error while creating board: " + data.message);
      toast.success(data.message);
      return data;

      // if ()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while creating the Board");
    }
  }

  public async createNewTask(task: Task) {
    try {
      const response = await axiosInstance1.post("/create-task", { ...task });
      const data = await response.data;
      console.log("comming")
      console.log(data);
      if (data.status !== "OK") throw new Error(data.message);
      toast.success(data.message);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      throw new Error("Failed to create the task");
    }
  }
}

const productServerService = new ProductServerService();
export { productServerService };
