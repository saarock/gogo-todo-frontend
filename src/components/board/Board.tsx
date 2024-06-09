import React from "react";
import "./board.css";
import Task from "../task/Task";
import { BoardProps } from "../../types";
import Input from "../input/Input";


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
}) => {
    return (
        <div className="gogo__board">
            {userProjectDetails ? (
                <div>
                    <div className="gogo__board__title" onClick={onBoardTitleClick}>
                        <h2>{board.name}</h2>
                    </div>
                    {onWhichBoardUserWantToAddTheTask === board.name && ( // Only show the input field for the selected board
                        <div className="gogo__board__title">
                            <Input onChange={whenUserTextForCreatingNewTask} value={userNewTaskName} />
                            <br />
                            <Input onChange={whenUserTextForCreatingNewTaskDesc} value={userNewTaskDescName} placeholder="desc..."/>
                            <button onClick={() => createNewTask(board.boardIndex || 0 , board.projectIndex || 0 , board.boardId || "")}>Add</button>
                            <button onClick={onClickListenerToCancelTheAddTask}>Cancel</button>
                        </div>
                    )}
                    {onWhichBoardUserWantToAddTheTask !== board.name && ( // Hide the input field for other boards
                        <div className="gogo__board__add__task" onClick={() => onClickListenerToAddTask(board.name)}>
                            <button>Add</button>
                        </div>
                    )}
                    {
                        board.tasks.map((task) =>
                        <Task taskName={task.name || "Loading..."}taskContent={task.content}/>
                        )
                    }
                </div>
            ) : (
                <div>No Board Found Create Board</div>
            )}
        </div>
    );
};


export default Board;
