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
import { addProject } from "../../features/ProductSlice";
import {
  addBoardUnderTheProject,
  addTaskUnderTheBoard,
} from "../../features/ProductSlice";
import { Board as TypeBoard, Project, Task, RootState } from "../../types";
import toast from "react-hot-toast";
import useCheckProductsAndReturnIfExist from "../../hooks/useCheckProductsAndReturnIfExist";
import { TaskActionTypes, taskReducer } from "../../reducer/task.reducer";
import {
  ProductActionTypes,
  productReducer,
} from "../../reducer/product.reducer";
import { productServerService } from "../../services";

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
  });
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
      if (taskState.taskName.trim() === "") throw new Error("Task Name requried");
      let task: Task = {
        name: taskState.taskName,
        content: taskState.taskDesc,
        boardId: boardId,
        boardIndex: boardIndex,
        projectIndex: projectIndex,
      };


      ; (async () => {
        try {
          const responseData = await productServerService.createNewTask(task);
          const createdTask: Task = await responseData.data;
          task = {
            ...task,
            taskId: createdTask.taskId,
          }
          dispatch(addTaskUnderTheBoard(task));
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


    if (productState.productTitleOrName === undefined) throw new Error("Title Name requried");
    const newProject: Project = {
      name: productState.productTitleOrName,
      userId: userID.toString(),
      boards: [],
    };


    setLoading(true);



    // first send the Project to the data base
    ; (async () => {
      try {
        if (!productState.productTitleOrName) return;
        const currentCreatedUserProjectName = productState.productTitleOrName
          .trim()
          .toLowerCase()
          .toString();
        if (!currentCreatedUserProjectName) return;
        const projectDetails: Project = await productServerService.createNewProduct(newProject);
        console.log(projectDetails)
        // then change the state

        await dispatch(addProject(projectDetails));
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
    console.log(currentUserProject)



    if (projectId == undefined || boardName.trim() === "" || projectName == undefined || projectName.trim() === "") return;
   

    let board: TypeBoard = {
      projectId: projectId,
      name: boardName,
      projectIndex: currentUserProject?.index,
      boardIndex: currentUserProject?.boards.length,
      tasks: [],
    };

    ; (async () => {
      try {
        const createdBoardResponse = await productServerService.createNewBoard(board);
        const createBoard: TypeBoard = createdBoardResponse.data;
        console.log("this is created board")
        console.log(createBoard)

        // have to improve here more;
        board = {
          ...board,
          boardId: createBoard.boardId
        }
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






  return (
    <div className="gogo__product__container">
      <div>
        <SideBar />
      </div>
      {
        loading && <Loader/>
      }
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
            <div className="gogo__boards">
            
              {
                currentUserProject?.boards &&
                currentUserProject?.boards.map((board) => (
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

                ))

              }

            </div>
          </div>
        </ProjectProductContainer>
      }
    </div>
  );
};

export default Product;
