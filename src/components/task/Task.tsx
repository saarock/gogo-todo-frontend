import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { TaskProps, TaskToptions } from '../../types'
import './task.css'
import Button from '../button/Button'
import Input from '../input/Input'
import { BiCross, BiCut } from 'react-icons/bi'
import { theme } from 'antd'
import useTheme from '../../context/modeContext.ts'
import {CgRowFirst} from "react-icons/cg";
const Task: React.FC<TaskProps & TaskToptions> = ({
    task,
    onClickEvent,
    taskContent,
    updateTaskDesc,
    onChangeNewTaskTitle,
    taskNewTitle,
    updateTaskTitle,
    onChangeTaskNewDesc,
    taskNewDesc,
    isUserWantToChangeTheTaskDesc,
    isUserWantToChangeTheTaskTitle,
    isTaskOptionOpen,
    taskId,
    clickForUpdateTaskDesc,
    clickForUpdateTaskTitle,
    hideOption,
    deleteTask,
    boardId,
    onCheckOrUnCheck,
}) => {
    const theme = useTheme()
    if (!task.taskId) return

    return (
        <div
            className={`gogo__board__task ${task.complete ? 'task-completed' : ''} ${theme.themeMode === 'dark' ? 'gogo__task__at__dark__mode' : ''}`}
        >
            <div className={`gogo__check_box`}>
                <label htmlFor={`check_box_${taskId}`}>
                    {task.complete ? 'not-completed?' : 'completed ?'}
                </label>
                <input
                    type="checkbox"
                    onChange={() =>
                        onCheckOrUnCheck(task.complete, task.taskId, boardId)
                    }
                    checked={task.complete}
                />
            </div>
            {isTaskOptionOpen && taskId === task.taskId && (
                <div className="gogo__task__options__whole__container">
                    <div className="gogo__task__title">
                        <h1>Task options</h1>
                    </div>

                    <div className="gogo__task__options__body">
                        <div className="gogo__task__cut">
                            <span onClick={hideOption}>{<CgRowFirst />}</span>
                        </div>
                        <div
                            className={`gogo__task__title__update ${
                                isUserWantToChangeTheTaskTitle
                                    ? 'd-yes-title'
                                    : 'd-no-title'
                            }`}
                        >
                            <Input
                                placeholder="Enter new title..."
                                className="gogo__make__change__input"
                                value={taskNewTitle}
                                onChange={onChangeNewTaskTitle}
                            />
                            <Button
                                text="Update title"
                                className="gogo__make__change__button"
                                onClick={() =>
                                    updateTaskTitle(task.taskId || -1, boardId)
                                }
                            />
                        </div>

                        <div
                            className={`gogo__task__desc__update  ${
                                isUserWantToChangeTheTaskDesc
                                    ? 'd-yes-desc'
                                    : 'd-no-desc'
                            }`}
                        >
                            <Input
                                placeholder="Enter new desc..."
                                className="gogo__make__change__input"
                                value={taskNewDesc}
                                onChange={onChangeTaskNewDesc}
                            />
                            <Button
                                text="Update desc"
                                className="gogo__make__change__button"
                                onClick={() =>
                                    updateTaskDesc(task.taskId || -1, boardId)
                                }
                            />
                        </div>
                    </div>
                    <div className="gogo__options__of__task">
                        <Button
                            text="Update Title"
                            className={`task__option ${isUserWantToChangeTheTaskTitle && 'active__task__option'}`}
                            onClick={clickForUpdateTaskTitle}
                        />
                        <Button
                            text="Update Desc"
                            className={`task__option ${isUserWantToChangeTheTaskDesc && 'active__task__option'}`}
                            onClick={clickForUpdateTaskDesc}
                        />
                        <Button
                            text="Delete"
                            className="task__option"
                            onClick={() => deleteTask(boardId)}
                        />
                    </div>
                </div>
            )}
            <div className="gogo__board__task__top">
                <div className="gogo__board__task__top__title">
                    <h3>{task.name}</h3>
                </div>
                <div className="gogo__board__task__top__options">
                    <span
                        className="gogo-bs-three-dots"
                        onClick={() => onClickEvent(task.taskId)}
                    >
                        {' '}
                        <BsThreeDots />
                    </span>
                </div>
            </div>
            <div className="gogo__board__task__content">
                <p>{taskContent}</p>
            </div>
        </div>
    )
}

export default Task
