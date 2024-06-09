import React from "react";
import { Board, Project } from "./user";

// IN this project i am using the name of both project and product so don't get worried because of this (PRODUCT AND PROJECT ARE SAME)
export interface ProductProps {
  onClickEvent?: () => void;
  productTitle?: string;
  createAt?: string;
}

export interface TaskProps extends ProductProps {
  taskName: string,
  taskContent? :string;
}
export interface BoardProps {
  onClickListenerToAddTask: (boardName: string) => void;
  onBoardTitleClick?: () => void;
  onWhichBoardUserWantToAddTheTask?: string;
  onClickListenerToCancelTheAddTask?: () => void;
  onClickListenerToSaveTask?: () => void;
  userProjectDetails?: Project | null;
  board: Board;
  createNewTask: (boardIndex: number, projectIndex: number, boardId: string) => void;
  whenUserTextForCreatingNewTask?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userNewTaskName?: string;
  whenUserTextForCreatingNewTaskDesc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userNewTaskDescName?: string;
}

export interface ProductHeaderProps {
  addProduct?: () => void;
  isUserWantToCreateTheProduct?: boolean;
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
