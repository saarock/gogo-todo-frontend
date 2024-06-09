import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  Board,
  ProductHead,
  ProjectProductContainer,
  SideBar,
} from "../../components";
import "./product.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addProject } from "../../features/ProductSlice";
import {
  addBoardUnderTheProject,
  addTaskUnderTheBoard,
} from "../../features/ProductSlice";
import { Board as TypeBoard, Project, Task } from "../../types";
import toast from "react-hot-toast";
import useCheckProductsAndReturnIfExist from "../../hooks/useCheckProductsAndReturnIfExist";
import { TaskActionTypes, taskReducer } from "../../reducer/task.reducer";
import {
  ProductActionTypes,
  productReducer,
} from "../../reducer/product.reducer";

const Product = () => {
  const dispatch = useDispatch();
  const { productname } = useParams();
  const navigate = useNavigate();

  const [boardName, setBoardName] = useState<string>("");
  const [taskState, taskDispatch] = useReducer(taskReducer, {
    taskName: "",
    taskDesc: "",
    isUserWantToAddTask: "",
  });
  const [productState, productDispatch] = useReducer(productReducer, {
    productTitleOrName: "",
    isUserWantToCreateTheProduct: false,
  });

  // this effect will run when user want to create the new project
  useEffect(() => {
    if (productname === "new-project") {
      productDispatch({
        type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT,
        payload: true,
      });
    }
  }, [productname && navigate]);

  const addTask = useCallback((name: string) => {
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK,
      payload: name,
    });
  }, []);

  const cancleAddTask = useCallback(() => {
    // setIsUserWantToAddTask("");
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK,
      payload: "",
    });
  }, []);

  const onChangeTask = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // setTaskName(e.target.value);
    taskDispatch({
      type: TaskActionTypes.SET_TASK_NAME,
      payload: e.target.value,
    });
  }, []);

  const onChangeTaskDesc = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      taskDispatch({
        type: TaskActionTypes.SET_TASK_DESC,
        payload: e.target.value,
      });
    },
    []
  );

  const createNewTask = useCallback(
    (boardIndex: number, projectIndex: number, boardId: string) => {
      try {
        if (boardIndex <= -1 && projectIndex <= -1) return;
        const task: Task = {
          name: taskState.taskName,
          content: taskState.taskDesc,
          boardId: boardId,
          boardIndex: boardIndex,
          projectIndex: projectIndex,
        };

        dispatch(addTaskUnderTheBoard(task));
        // setTaskName("")
        taskDispatch({
          type: TaskActionTypes.SET_TASK_NAME,
          payload: "",
        });
        taskDispatch({
          type: TaskActionTypes.SET_TASK_DESC,
          payload: "",
        });
        toast.success("Task Added");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error("Unknown error");
      }
    },
    [taskState.taskName, taskState.taskDesc]
  );

  const saveProject = useCallback(() => {
    try {
      const newProject: Project = {
        name: productState.productTitleOrName,
        boards: [],
      };
      // setProjectOrProductTitle("");
      productDispatch({
        type: ProductActionTypes.CREATE_NEW_PRODUCT,
        payload: "",
      });
      dispatch(addProject(newProject));
      // setIsUserWantToCreateTheProduct(false);
      productDispatch({
        type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT,
        payload: false,
      });
      (() => {
        if (!productState.productTitleOrName) return;
        const currentCreatedUserProjectName = productState.productTitleOrName
          .trim()
          .toLowerCase()
          .toString();
        if (!currentCreatedUserProjectName) return;
        navigate("/dash/projects/" + currentCreatedUserProjectName);
      })();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        toast.error("Unknown  Error came while creating the project");
      }
    }
  }, [productState.productTitleOrName]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      productDispatch({
        type: ProductActionTypes.CREATE_NEW_PRODUCT,
        payload: e.target.value,
      });
    },
    []
  );

  // create the project
  const showInputFiledToCreateTheProduct = useCallback(() => {
    // setIsUserWantToCreateTheProduct(true);
    productDispatch({
      type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT,
      payload: true,
    });
  }, []);

  const [currentUserProject] = useCheckProductsAndReturnIfExist();

  const boardInputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBoardName(e.target.value);
    },
    []
  );

  const addBoard = useCallback(() => {
    try {
      const projectId = currentUserProject?.id;
      if (projectId === undefined || boardName === "") return;
      const board: TypeBoard = {
        projectId: projectId,
        name: boardName,
        projectIndex: currentUserProject?.index,
        tasks: [],
      };

      // have to improve here more;
      dispatch<any>(addBoardUnderTheProject(board));

      setBoardName("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Some thing wrong");
      }
    }
  }, [boardName]);

  return (
    <div className="gogo__product__container">
      <div>
        <SideBar />
      </div>
      {
        <ProjectProductContainer>
          <div className="gogo__product__page">
            <div className="product__header">
              <ProductHead
                isUserWantToCreateTheProduct={
                  productState.isUserWantToCreateTheProduct
                }
                saveProject={saveProject}
                onChangeTitle={onChangeTitle}
                value={productState.productTitleOrName}
                addProduct={showInputFiledToCreateTheProduct}
                userProject={currentUserProject || null}
                addBoard={addBoard}
                boardInputOnChange={boardInputOnChange}
                boardName={boardName}
              />
            </div>
            <div className="gogo__boards">
              {currentUserProject?.boards.map((board) => (
                <Board
                  key={board.boardId}
                  onClickListenerToAddTask={addTask}
                  // passing the board name which is unique where user want to create the task
                  onWhichBoardUserWantToAddTheTask={
                    taskState.isUserWantToAddTask
                  }
                  onClickListenerToCancelTheAddTask={cancleAddTask}
                  userProjectDetails={currentUserProject}
                  board={board}
                  createNewTask={createNewTask}
                  userNewTaskName={taskState.taskName}
                  whenUserTextForCreatingNewTask={onChangeTask}
                  whenUserTextForCreatingNewTaskDesc={onChangeTaskDesc}
                  userNewTaskDescName={taskState.taskDesc}
                />
              ))}
            </div>
          </div>
        </ProjectProductContainer>
      }
    </div>
  );
};

export default Product;
