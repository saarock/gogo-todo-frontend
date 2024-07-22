import toast from "react-hot-toast";
import { axiosInstance1, axiosInstance2 } from "../api/axiosInstance";
import {
  Board,
  BoardIdAndName,
  DeleteProduct,
  ProductNameandId,
  Project,
  Task,
  TaskUpdateDetails,
} from "../types";
import axios from "axios";
import {errorUtil, responseServerUtil} from "../utils";
import authClient from "./authClient";
// import {authClient} from "./index.ts";

//  handel all the error very correctly;
class ProductServerService {
  public async createNewProduct(newProduct: Project):Project<void> {
    try {
      const response = await axiosInstance1.post("/create-new-product", {
        ...newProduct,
      });

      const data = await response.data;

      if (data.status !== "OK") {
        throw new Error(data.message);
      }

      return data.data;
    } catch (error) {
      errorUtil.handelError(error);
      throw error;

    }
  }

  public async getProducts(userID: number, page: number):Promise<any> {
    try {
      const response = await axiosInstance1.get(
        `get-products?page=${page}&size=3&sortBy=updatedAt&direction=desc&userId=${userID}`
      );
      const data = await response.data;

      if (data.status !== "OK") throw new Error(data.message);
      console.log("this is also");
      console.log(data.data.content);
      return await data.data;
    } catch (error) {
      errorUtil.handelError(error);
      throw error;
    }
  }

  public async createNewBoard(board: Board):Promise<void> {
    try {
      const response = await axiosInstance1.post("/create-board", { ...board });
      const data = await response.data;
      if (data.status !== "OK")
        throw new Error("Error while creating board: " + data.message);
      return data.data;
    } catch (error) {
      errorUtil.handelError(error);
      throw error;
    }
  }

  public async createNewTask(task: Task) {
    try {
      const response = await axiosInstance1.post("/create-task", { ...task });
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      toast.success(data.message);
      return data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const isUnauthorized = responseServerUtil.checkIsUnauthorized(
            error.response.data.type
          );
          if (isUnauthorized) {
            authClient.unEthicLogout();
            return;
          }
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error(error.request.data.message);
        } else {
          throw new Error(
            "Sorry something wrong try again by refreshing your page."
          );
        }
      } else {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          errorUtil.handelError(error);
          throw error;
        }
      }
    }
  }

  public async updateProduct(productUpdateDetails: ProductNameandId):Promise<void> {
    try {
      const response = await axiosInstance1.put(
        `/update-product/${productUpdateDetails.productId}`,
        productUpdateDetails
      );
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
    } catch (error) {
      errorUtil.handelError(error);
      throw error;
    }
  }

  public async deleteProduct(productId: DeleteProduct): Promise<void> {
    try {
      const response = await axiosInstance1.delete(
        `/delete-product/${productId.productId}`
      );
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
    } catch (error) {
      errorUtil.handelError(error);
      throw error;
    }
  }

  public async updateBoardName(
    boardIdAndNewName: BoardIdAndName
  ): Promise<Board | null> {
    try {
      console.log({ boardName: boardIdAndNewName.boardName });
      const response = await axiosInstance1.put(
        `/update-board/${boardIdAndNewName.boardId}`,
        { boardName: boardIdAndNewName.boardName }
      );
      const data = await response.data;
      console.log(data);
      if (data.status !== "OK") throw new Error(data.message);
      return data.data;
    } catch (error) {
      errorUtil.handelError(error);
      return null;
    }
  }

  public async deleteBoard(boardId: number): Promise<Error | boolean> {
    try {
      const response = await axiosInstance1.delete(`/delete-board/${boardId}`);
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return true;
    } catch (error) {
      errorUtil.handelError(error);
      return false;
    }
  }

  public async updateTask(
    taskDetails: TaskUpdateDetails
  ): Promise<Task | null> {
    try {
      const response = await axiosInstance1.put(
        `/update-task/${taskDetails.taskId}`,
        { ...taskDetails }
      );
      const data = await response.data;
      console.log(data);

      if (data.status !== "OK") throw new Error(data.message);
      return data.data as Task;
    } catch (error) {
      errorUtil.handelError(error);
      return null;
    }
  }

  public async deleteTask(taskId: number): Promise<boolean | Error> {
    try {
      const response = await axiosInstance1.delete(`/delete-task/${taskId}`);
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return true;
    } catch (error) {
      errorUtil.handelError(error);
      return false;
    }
  }

  public async searchProduct(productName: string, userId: number) {
    try {
      const response = await axiosInstance1.get(`/search`, {
        params: {
          userId: userId,
          productName: productName,
        },
      });
      const data = await response.data;
      console.log(data);
      if (data.status === "OK") {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const isUnauthorized = responseServerUtil.checkIsUnauthorized(
            error.response.data.type
          );
          if (isUnauthorized) {
            authClient.unEthicLogout();
            return;
          }
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error(error.request.data.message);
        } else {
          throw new Error(
            "Sorry something wrong try again by refreshing your page."
          );
        }
      } else {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          authClient.unEthicLogout();
        }
      }
    }
  }

  public async updateModifiedProduct(id: number):Promise<void> {
    try {
      const response = await axiosInstance1.put(`modified-product/${id}`);
      const data = await response.data;
    } catch (error) {
      errorUtil.handelError(error);
      throw error;
    }
  }
}

const productServerService = new ProductServerService();
export { productServerService };
