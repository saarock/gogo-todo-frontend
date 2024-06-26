import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { TaskProps } from "../../types";
import "./task.css";
const Task: React.FC<TaskProps> = ({ task, onClickEvent, taskContent }) => {
  if (!task.taskId) return;
  return (
    <div className="gogo__board__task">
      <div className="gogo__board__task__top">
        <div className="gogo__board__task__top__title">
          <h3>{task.name}</h3>
        </div>
        <div className="gogo__board__task__top__options">
          <span
            className="gogo-bs-three-dots"
            onClick={() => onClickEvent(task.taskId)}
          >
            {" "}
            <BsThreeDots />
          </span>
        </div>
      </div>
      <div className="gogo__board__task__content">{taskContent}</div>
    </div>
  );
};

export default Task;
