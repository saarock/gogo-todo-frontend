import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { TaskProps } from '../../types';
const Task: React.FC<TaskProps> = ({taskName, onClickEvent, taskContent}) => {
  return (
    <div className="gogo__board__task">
      <div className="gogo__board__task__top">
        <div className="gogo__board__task__top__title">
          <h3>{taskName}</h3>
        </div>
        <div className="gogo__board__task__top__options" onClick={onClickEvent}>
          <BsThreeDots />
        </div>
      </div>
      <div className="gogo__board__task__content">
       {taskContent}
      </div>
    </div>
  )
}

export default Task