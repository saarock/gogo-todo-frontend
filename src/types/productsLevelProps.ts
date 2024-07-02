import React from "react";
import { Board, Project, Task } from "./user";
import { ProductState } from "../reducer/product.reducer";

/**
 * (NOTE:) In this project I am using the name of both project and product so don't get worried because of this (PRODUCT AND PROJECT ARE SAME)
 * At this file only include the props types of the product, board and task related.
 *  If you are searching the types of the client and server product, board , task as well as user types we can foudn at same DIR in ( user.ts ) file.
 */
export interface ProductProps {
  onClickEvent: () => void;
  product: Project;
  createAt?: string;
  openOptions: (e:React.MouseEvent<HTMLDivElement>, productId: number) => void;
  options?: ProductState;
  deleteProduct : (e:React.MouseEvent<HTMLSpanElement>, productId: number) => void;
  updateProduct : (e:React.MouseEvent<HTMLSpanElement>, productId: number) => void;


  // deleteProduct: (id: number) => void;
}

export interface TaskProps {
  onClickEvent: (taskId: number | undefined) => void;
  task: Task;
  taskContent?: string;
  isTaskOptionOpen: boolean;
  taskId: number;
}
export interface BoardProps {
  onClickListenerToAddTask: (boardName: string) => void;
  onBoardTitleClick?: () => void;
  onWhichBoardUserWantToAddTheTask?: string;
  onClickListenerToCancelTheAddTask?: () => void;
  onClickListenerToSaveTask?: () => void;
  userProjectDetails?: Project | null;
  board: Board;
  createNewTask: (
    boardIndex: number,
    projectIndex: number,
    boardId: number
  ) => void;
  whenUserTextForCreatingNewTask?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  userNewTaskName?: string;
  whenUserTextForCreatingNewTaskDesc?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  userNewTaskDescName?: string;
  openBoardOptions: (boardId: number) => void;
  isWantToSeeOptions:boolean;
  whichBoardOptionsUserWantToSee : number;
  updateBoardName: (boardId: number) => void;
  isUserWantToUpdateTheBoardName: boolean;
  cancleUpdateBoardName: () => void;
  onChangeEventOfBoardName: (e:React.ChangeEvent<HTMLInputElement>) => void;
  saveNewBoardName: () => void;
  deleteBoard:(boardId: number) => void; 

}

export interface ProductHeaderProps {
  addProduct?: () => void;
  isUserWantToCreateTheProduct: boolean;
  saveProject?: () => void;
  forwardRef?: () => void;
  inputElement?: React.ReactElement<HTMLInputElement>;
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  userProject?: Project | null;
  addBoard: () => void;
  boardInputOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentProjectId?: string;
  boardName?: string;
}

export interface CreateProjectProps {
  createProject?: () => void;
}

export interface ProjectHeaderProps {
  next?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prev?: () => void;
}
