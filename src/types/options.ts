import React from 'react'

export interface TaskToptions {
    clickForUpdateTaskTitle: () => void
    clickForUpdateTaskDesc: () => void
    updateTaskTitle: (taskId: number, boardId: number) => void
    onChangeNewTaskTitle: (e: React.ChangeEvent<HTMLInputElement>) => void
    taskNewTitle: string
    updateTaskDesc: (taskId: number, boardId: number) => void
    onChangeTaskNewDesc: (e: React.ChangeEvent<HTMLInputElement>) => void
    taskNewDesc: string
    isUserWantToChangeTheTaskTitle: boolean
    isUserWantToChangeTheTaskDesc: boolean
    hideOption: () => void
}
