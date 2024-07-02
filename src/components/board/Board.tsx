import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./board.css";
import Task from "../task/Task";
import { BoardProps, TaskUpdateDetails } from "../../types";
import Input from "../input/Input";
import { color } from "../../utils";
import { BsThreeDots } from "react-icons/bs";
import Button from "../button/Button";
import { FiDelete } from "react-icons/fi";
import { TaskActionTypes, taskReducer } from "../../reducer/task.reducer";
import { updateTaskById } from "../../features/ProductSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

const Board: React.FC<BoardProps> = ({
  onWhichBoardUserWantToAddTheTask,
  onBoardTitleClick,
  board,
  onClickListenerToAddTask,
  onClickListenerToCancelTheAddTask,
  userProjectDetails,
  createNewTask,
  userNewTaskName,
  whenUserTextForCreatingNewTask,
  whenUserTextForCreatingNewTaskDesc,
  userNewTaskDescName,
  openBoardOptions,
  isWantToSeeOptions,
  whichBoardOptionsUserWantToSee,
  updateBoardName,
  isUserWantToUpdateTheBoardName,
  cancleUpdateBoardName,
  onChangeEventOfBoardName,
  saveNewBoardName,
  deleteBoard
}) => {
  const [isTaskOptionOpened, setTaskOption] = useState(false);
  const [taskId, setTaskId] = useState<number>(-1);
  const [beingDragged, setBeingDragged] = useState<HTMLElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [taskState, taskDispatch] = useReducer(taskReducer, {
    taskName: "",
    taskDesc: "",
    isUserWantToAddTask: "" /** track when user click the add task button */,
    isUserWantToUpdateTheTaskTitle: false,
     isUserWantToUpdateTheTaskDesc: false
  });

  const dispatch = useDispatch();

  const showTaskOptions = (taskId: number | undefined) => {
    if (taskId === undefined) return;
    setTaskOption(isTaskOptionOpened ? false : true);
    setTaskId(taskId);
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_TITLE,
      payload : true
    });

    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_DESC,
      payload : false
    });
  };

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    e.dataTransfer.effectAllowed = "move";
    setBeingDragged(target);
    target.style.backgroundColor = "pink";
    setTimeout(() => {
      target.style.display = "none";
    });
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.add("highlight");
  };

  const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;

    target.classList.remove("highlight");
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.add("highlight");
  };

  const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("highlight");
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!beingDragged) return;
    const target = e.currentTarget as HTMLElement;
    target.appendChild(beingDragged);
    target.classList.remove("highlight");
  };


  const randomColor = useMemo(() => {
    return color.generateRandomColor();
  }, []);



  const updateTaskTitle = useCallback( async (taskId: number) => {
    try {
      setLoading(true);
    const updateDetails: TaskUpdateDetails = {
      taskTitle: taskState.taskName,
      taskContent: taskState.taskDesc,
      taskId: taskId
    }

    await dispatch<any>(updateTaskById(updateDetails));
    toast.success("Task title updated successfully")
    
    
  } catch(error) {
    toast.error(error instanceof Error ? error.message : "Something wrong while updating the task details");
  } finally {
    setTaskOption(false);
    setLoading(false);
    taskDispatch({
      type: TaskActionTypes.SET_TASK_NAME,
      payload : ""
    })
  }
  }, [taskState.taskName, taskState.taskDesc]);



  const updateTaskDesc = useCallback( async (taskId: number) => {
    try {
      setLoading(true);
    const updateDetails: TaskUpdateDetails = {
      taskTitle: taskState.taskName,
      taskContent: taskState.taskDesc,
      taskId: taskId
    }

    await dispatch<any>(updateTaskById(updateDetails));
    toast.success("Task content updated successfully");
  
  } catch(error) {
    toast.error(error instanceof Error ? error.message : "Something wrong while updating the task details");
  } finally {
    setTaskOption(false);
    setLoading(false);
    taskDispatch({
      type: TaskActionTypes.SET_TASK_DESC,
      payload : ""
    })
  }
  }, [taskState.taskDesc, taskState.taskName]);

  const clickForUpdateTaskTitle = useCallback(() => {
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_DESC,
      payload: false
    });
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_TITLE,
      payload: true
    });


  },[taskState.isUserWantToUpdateTheTaskTitle, taskState.isUserWantToUpdateTheTaskDesc]);
  const clickForUpdateTaskDesc = useCallback(() => {
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_TITLE,
      payload: false
    });
    taskDispatch({
      type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_DESC,
      payload: true
    });
  },[taskState.isUserWantToUpdateTheTaskTitle, taskState.isUserWantToUpdateTheTaskDesc]);

  const onChangeNewTaskTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    taskDispatch({
      type: TaskActionTypes.SET_TASK_NAME,
      payload: e.target.value
    });
  }, [taskState.taskName]);

  const onChangeTaskNewDesc = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    taskDispatch({
      type: TaskActionTypes.SET_TASK_DESC,
      payload: e.target.value
    });
  }, [taskState.taskDesc]);
  
  const hideTaskOption = useCallback(() => {
    setTaskOption(false)
  }, [isTaskOptionOpened])

 
  if (loading) return <Loader/>


  return (
    <div
      className="gogo__board"
      draggable
      onDragStart={dragStart}
      onDragOver={dragOver}
      onDragEnd={dragEnd}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={drop}
      style={{borderTop: `1rem solid ${randomColor}`, margin: "0.5rem"}}
    >
      {whichBoardOptionsUserWantToSee == board.boardId &&
        isWantToSeeOptions && (
          <div className="gogo__options__of__board">
            <Button onClick={() => updateBoardName(board.boardId || -1)} text="Update"/>
            <Button text="Delete" onClick={() => deleteBoard(board.boardId || -1)}/>
          </div>
        )}
      <span onClick={() => openBoardOptions(board.boardId || -1)} className="gogo-bs-three-dots">
        <BsThreeDots/>
      </span>
      {userProjectDetails ? (
        <div>
          <div className="gogo__board__title" onClick={onBoardTitleClick}>
            <h2>
              {" "}
              {isUserWantToUpdateTheBoardName &&
              board.boardId === whichBoardOptionsUserWantToSee ? (
                <div>
                  {" "}
                  <Input type="text"  onChange={onChangeEventOfBoardName}/> 
                  <Button onClick={saveNewBoardName} text="Saved" className="gogo__board__newname__saved__button"/>
                  <Button onClick={cancleUpdateBoardName} text="Cancel" className="gogo__board__delete__button"/>
                </div>
              ) : (
                board.name
              )}
            </h2>
          </div>
          {board.tasks.length >= 1 &&
            board.tasks.map((task) => (
              <div className="gogo__task__container" key={task.taskId}>
                <Task
                  task={task || "Loading..."}
                  taskContent={task.content}
                  onClickEvent={showTaskOptions}
                  isTaskOptionOpen={isTaskOptionOpened}
                  taskId={taskId}
                  updateTaskTitle={updateTaskTitle}
                  clickForUpdateTaskDesc={clickForUpdateTaskDesc}
                  clickForUpdateTaskTitle={clickForUpdateTaskTitle}
                  updateTaskDesc={updateTaskDesc}
                  taskNewTitle= {taskState.taskName}
                  taskNewDesc= {taskState.taskDesc}
                  isUserWantToChangeTheTaskDesc = {taskState.isUserWantToUpdateTheTaskDesc}
                  isUserWantToChangeTheTaskTitle = {taskState.isUserWantToUpdateTheTaskTitle}
                  onChangeNewTaskTitle={onChangeNewTaskTitle}
                  onChangeTaskNewDesc={onChangeTaskNewDesc}
                  hideOption={hideTaskOption}

                />
              </div>
              
            ))}
          {onWhichBoardUserWantToAddTheTask === board.name && (
            <div className="gogo__board__title">
              <Input
                onChange={whenUserTextForCreatingNewTask}
                value={userNewTaskName}
              />
              <br />
              <Input
                onChange={whenUserTextForCreatingNewTaskDesc}
                value={userNewTaskDescName}
                placeholder="desc..."
              />
              
              <Button
              text="Add"
                onClick={() =>
                  createNewTask(
                    board.boardIndex || 0,
                    board.projectIndex || 0,
                    board.boardId || -1
                  )
                }
             />
              
              <Button onClick={onClickListenerToCancelTheAddTask} text="cancle" />
             
            </div>
          )}
          {onWhichBoardUserWantToAddTheTask !== board.name && (
            <div
              className="gogo__board__add__task"
              onClick={() => onClickListenerToAddTask(board.name)}
            >
              <Button text="Add New Task" className="gogo__add__button" />
            </div>
          )}
        </div>
      ) : (
        <div>No Board Found Create Board</div>
      )}
    </div>
  );
};

export default Board;
