import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  Board,
  Loader,
  ProductHead,
  ProjectProductContainer,
  SideBar,
} from "../../components";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { addProject } from "../../features/ProductSlice";
import {
  createProject,
  createTask,
  deleteBoardById,
  updateBoardName,
} from "../../features/ProductSlice";
import { addBoardUnderTheProject } from "../../features/ProductSlice";
import {
  Board as TypeBoard,
  Project,
  Task,
  RootState,
  BoardIdAndName,
  BoardIdAndProjectIndex,
} from "../../types";
import toast from "react-hot-toast";
import useCheckProductsAndReturnIfExist from "../../hooks/useCheckProductsAndReturnIfExist";
import { TaskActionTypes, taskReducer } from "../../reducer/task.reducer";
import {
  ProductActionTypes,
  productReducer,
} from "../../reducer/product.reducer";
import {
  boardInitialState,
  boardReducer,
  TypeOfBoard,
} from "../../reducer/board.reducer";
import ProductWrapper from "../../components/ProductWrapper";

const Product = () => {
  const dispatch = useDispatch();
  const { productname } = useParams();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.user?.id);
  const [loading, setLoading] = useState<boolean>(false);

  const [boardName, setBoardName] = useState<string>("");
  const [taskState, taskDispatch] = useReducer(taskReducer, {
    taskName: "",
    taskDesc: "",
    isUserWantToAddTask: "" /** track when user click the add task button */,
    isUserWantToUpdateTheTaskTitle: false,
     isUserWantToUpdateTheTaskDesc: false
  });

  const [boardState, boardDispatch] = useReducer(
    boardReducer,
    boardInitialState
  );

  const [productState, productDispatch] = useReducer(productReducer, {
    productTitleOrName: "",
    isUserWantToCreateTheProduct: false,
  });

  // This effect will run when user want to create the new project
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
    (boardIndex: number, projectIndex: number, boardId: number) => {
      if (boardIndex <= -1 && projectIndex <= -1) return;
      if (taskState.taskName.trim() === "")
        throw new Error("Task Name requried");
      let task: Task = {
        name: taskState.taskName,
        content: taskState.taskDesc,
        boardId: boardId,
        boardIndex: boardIndex,
        projectIndex: projectIndex,
      };

      (async () => {
        try {
          await dispatch<any>(createTask(task));
          toast.success("Task Added");
          taskDispatch({
            type: TaskActionTypes.SET_TASK_NAME,
            payload: "",
          });
          taskDispatch({
            type: TaskActionTypes.SET_TASK_DESC,
            payload: "",
          });
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
            return;
          }
          toast.error("Unknown error");
        }
      })();
    },
    [taskState.taskName, taskState.taskDesc, dispatch]
  );

  const saveProject = useCallback(() => {
    if (!userID) {
      window.location.reload();
      return;
    }

    if (productState.productTitleOrName === undefined)
      throw new Error("Title Name requried");
    const newProject: Project = {
      name: productState.productTitleOrName.trim().toString(),
      userId: userID.toString(),

      boards: [],
    };

    setLoading(true);

    // first send the Project to the data base
    (async () => {
      try {
        if (!productState.productTitleOrName) return;
        const currentCreatedUserProjectName = productState.productTitleOrName
          .trim()
          .toLowerCase()
          .toString();
        if (!currentCreatedUserProjectName) return;
        await dispatch<any>(createProject(newProject));
        navigate("/dash/projects/" + currentCreatedUserProjectName);
        productDispatch({
          type: ProductActionTypes.CREATE_NEW_PRODUCT,
          payload: "",
        });

        productDispatch({
          type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT,
          payload: false,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          console.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    })();
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
  console.log(currentUserProject);

  const boardInputOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBoardName(e.target.value);
    },
    []
  );

  const addBoard = useCallback(() => {
    if (!currentUserProject) throw new Error("Current user doesn't exist");
    const projectId = currentUserProject.id;
    const projectName = currentUserProject.name;

    if (
      projectId == undefined ||
      boardName.trim() === "" ||
      projectName == undefined ||
      projectName.trim() === ""
    ) {
      toast.error("Details are fulfilled properly")
      return
    }
    let board: TypeBoard = {
      projectId: projectId,
      name: boardName,
      projectIndex: currentUserProject?.index,
      boardIndex: currentUserProject?.boards.length,
      tasks: [],
    };

    (async () => {
      try {
        await dispatch<any>(addBoardUnderTheProject(board));
        setBoardName("");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Some thing wrong");
        }
      }
    })();
  }, [boardName]);

  // const controls = useDragControls();
  const openBoardOptions = useCallback(
    (boardId: number) => {
      boardDispatch({
        type: TypeOfBoard.SET_BOARD_ID,
        payload: boardId,
      });

      boardDispatch({
        type: TypeOfBoard.IS_WANT_TO_SEE_OPTIONS,
        payload: boardState.isWantToSeeOptions ? false : true,
      });
    },
    [boardState.isWantToSeeOptions, boardState.idOfBoard]
  );

  const LetsupdateBoardName = useCallback(() => {
    boardDispatch({
      type: TypeOfBoard.IS_WANT_TO_SEE_OPTIONS,
      payload: false,
    });
    boardDispatch({
      type: TypeOfBoard.IS_WANT_TO_UPDATE_BOARDNAME,
      payload: true,
    });
  }, [boardState.isWantToUpdateBoardName, boardState.isWantToSeeOptions]);

  const LetscancleUpdateBoardName = useCallback(() => {
    boardDispatch({
      type: TypeOfBoard.IS_WANT_TO_UPDATE_BOARDNAME,
      payload: false,
    });
  }, [boardState.isWantToUpdateBoardName]);

  const onChangeEventOfBoardName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      boardDispatch({
        type: TypeOfBoard.WANT_TOSET_NEW_BOARD_NAME,
        payload: e.target.value,
      });
    },
    [boardState.newBoardName]
  );

  const saveNewBoardName = useCallback(async () => {
    // alert(boardState.newBoardName);
    if (currentUserProject?.index === undefined)
      throw new Error("Project index requried");
    const updateBoardNameRequest: BoardIdAndName = {
      boardId: boardState.idOfBoard,
      boardName: boardState.newBoardName,
      projectIndex: currentUserProject?.index,
    };

    try {
      await dispatch<any>(updateBoardName(updateBoardNameRequest));
      boardDispatch({
        type: TypeOfBoard.IS_WANT_TO_UPDATE_BOARDNAME,
        payload: false,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : "Cannot update the boardName"
      );
    }
  }, [boardState.newBoardName, boardState.isWantToUpdateBoardName]);

  const deleteBoard = useCallback(async (boardId: number) => {
    try {
      if (currentUserProject?.index === undefined)
        throw new Error("Project Index required");
      const deleteBoardDetails: BoardIdAndProjectIndex = {
        projectIndex: currentUserProject?.index,
        boardId: boardId,
      };
      await dispatch<any>(deleteBoardById(deleteBoardDetails));
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Sorry cannot delete the board something is wrong try again"
      );
    }
  }, []);

  return (
    <div className="gogo__product__container">
      {loading && <Loader />}
      {
        <ProjectProductContainer>
          <div className="gogo__product__page">
            <div className="product__header">
              <ProductHead
                isUserWantToCreateTheProduct={
                  productState.isUserWantToCreateTheProduct || false
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
            <ProductWrapper>
              <div className="gogo__product__boards">
                {currentUserProject?.boards &&
                currentUserProject.boards.length >= 1 ? (
                  currentUserProject?.boards.map((board) => (
                    <div>
                      <Board
                        openBoardOptions={openBoardOptions}
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
                        isWantToSeeOptions={boardState.isWantToSeeOptions}
                        whichBoardOptionsUserWantToSee={boardState.idOfBoard}
                        updateBoardName={LetsupdateBoardName}
                        isUserWantToUpdateTheBoardName={
                          boardState.isWantToUpdateBoardName
                        }
                        cancleUpdateBoardName={LetscancleUpdateBoardName}
                        onChangeEventOfBoardName={onChangeEventOfBoardName}
                        saveNewBoardName={saveNewBoardName}
                        deleteBoard={deleteBoard}
                      />
                    </div>
                  ))
                ) : (
                  <div className="gogo__no__board__found__container">
                    {" "}
                    <strong>"No Boards found create Board"</strong>{" "}
                  </div>
                )}
              </div>
            </ProductWrapper>
          </div>
        </ProjectProductContainer>
      }
    </div>
  );
};

export default Product;
