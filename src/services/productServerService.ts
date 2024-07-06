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
import { Primitive } from "react-hook-form";

//  handel all the error very correctly;
class ProductServerService {
  public async createNewProduct(newProduct: Project) {
    try {
      const response = await axiosInstance1.post("/create-new-product", {
        ...newProduct,
      });

      const data = await response.data;
      console.log("this is the data");
      console.log(data);
      if (data.status !== "OK") {
        throw new Error(data.message);
      }

      // do something to that data
      toast.success(`${newProduct.name} Project Created`);
      return data.data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown Error while creating the project"
      );
    }
  }

  public async getProducts(userID: string, page: number) {
    try {
      const userNumberId = Number(userID);
      // Make the API request to fetch products
      const response = await axiosInstance1.get(
        `get-products?page=${page}&size=2&sortBy=updatedAt&direction=aesc&userId=${userNumberId}`
      );
      const data = await response.data;

      console.log("this is the data");

      console.log(data);
      if (data.status !== "OK") throw new Error(data.message);
      console.log(data.data.content);
      return data.data.content;
    } catch (error) {
      // Handle any errors that occur during the API request
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error while fetching board"
      );
    }
  }

  public async createNewBoard(board: Board) {
    try {
      const response = await axiosInstance1.post("/create-board", { ...board });
      const data = await response.data;
      if (data.status !== "OK")
        throw new Error("Error while creating board: " + data.message);
      return data.data;

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
      console.log("comming");
      console.log(data);
      if (data.status !== "OK") throw new Error(data.message);
      toast.success(data.message);
      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      throw new Error("Failed to create the task");
    }
  }

  public async updateProduct(productUpdateDetails: ProductNameandId) {
    try {
      const response = await axiosInstance1.put(
        `/update-product/${productUpdateDetails.productId}`,
        productUpdateDetails
      );
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknow error while updating the prodcut"
      );
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
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknow error while updating the prodcut"
      );
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
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else if (error.request) {
          throw new Error(error.request.data.message);
        } else {
          throw new Error("Error while deleting the board");
        }
      } else {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error("Failed to delete the board try again");
        }
      }
    }
  }

  public async updateTask(taskDetails: TaskUpdateDetails): Promise<Task> {
    try {
    const response = await axiosInstance1.put(`/update-task/${taskDetails.taskId}`, {...taskDetails});
    const data = await response.data;
    console.log(data);
    
    if (data.status !== "OK") throw new Error(data.message);
    return data.data;
    } catch(error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
        throw new Error(error.response?.data.message);
        } else if (error.request) {
        throw new Error(error.request.error);
        } else {
          throw new Error("Unknown exception error");
        }
      } else {
        throw new Error(error instanceof Error ? error.message : "Unknown error while updating the task");
      }
    }
  }

  public async deleteTask(taskId: number): Promise<boolean | Error> {
    try {
      const response = await axiosInstance1.delete(`/delete-task/${taskId}`);
      const data = await response.data;
      if (data.status !== "OK") throw new Error(data.message);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
        throw new Error(error.response?.data.message);
        } else if (error.request) {
        throw new Error(error.request.error);
        } else {
          throw new Error("Unknown exception error");
        }
      } else {
        throw new Error(error instanceof Error ? error.message : "Unknown error while deleting the task");
      }
    }
  }
}

const productServerService = new ProductServerService();
export { productServerService };
