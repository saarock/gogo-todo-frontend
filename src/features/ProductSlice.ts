import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
    Project,
    Board,
    Task,
    ProductUpdateTypes,
    ProductNameandId,
    DeleteProduct,
    BoardIdAndName,
    BoardIdAndProjectIndex,
    TaskUpdateDetails,
    TaskDeleteDetails,
    BoardStatus,
    Status,
} from '../types'
import { productServerService } from '../services'
import { productUtil } from '../utils'

// Initial state
const initialState: Project[] = []

// Async thunks for projects
export const createProject = createAsyncThunk(
    'projects/createProject',
    async (project: Project, thunkAPI) => {
        try {
            const currentProjectName = project.name
            const currentState = thunkAPI.getState() as { projects: Project[] }
            const state = currentState.projects
            if (currentProjectName?.trim() === '') {
                throw new Error('Project Name Required')
            }
            const isSame = state.findIndex(
                (currentProject) =>
                    currentProject.name?.toLowerCase().trim() ===
                    currentProjectName?.toLowerCase().trim()
            )

            if (isSame !== -1) {
                throw new Error('Project name already exist')
            }

            const updatedProject: Project = {
                ...project,
            }

            let projectDetails: Project =
                await productServerService.createNewProduct(updatedProject)
            projectDetails = {
                ...projectDetails,
                index: state.length,
            }

            return projectDetails
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
            return thunkAPI.rejectWithValue(
                'Unknown error while creting the project'
            )
        }
    }
)

export const addBoardUnderTheProject = createAsyncThunk(
    'projects/addBoardUnderTheProject',
    async (board: Board, thunkAPI) => {
        try {
            const productName = productUtil.getCurrentProductName()
            if (productName === '') throw new Error("Product Doesn't exist")
            if (board.name.trim() === '') throw new Error('Board Name requried')
            // Retrieve the current state
            const currentState = thunkAPI.getState() as { projects: Project[] }
            const state = currentState.projects

            // const project = state[projectIndex];
            const project = state.find(
                (project) => project.name.trim().toLowerCase() === productName
            )
            if (!project) throw new Error('Product doesnot exist')
            // Check for duplicate board names
            const isDuplicateName = await project.boards.some(
                (currentBoard) =>
                    currentBoard.name.trim().toLowerCase() ===
                    board.name.trim().toLowerCase()
            )

            if (isDuplicateName) {
                throw new Error('Board Name Already Exists')
            }

            const savedBoard = await productServerService.createNewBoard(board)

            return { savedBoard, productName }
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
            return thunkAPI.rejectWithValue(
                'Unknown error whiel creating the board'
            )
        }
    }
)
export const createTask = createAsyncThunk(
    'projects/board/createTask',
    async (task: Task, thunkAPI) => {
        try {
            // Validate task name
            if (task.name === '') {
                throw new Error('Task Name Required')
            }

            // get the currentprojectName
            const productName = productUtil.getCurrentProductName()
            if (!productName) throw new Error("Product doesn't exist")
            // Retrieve the current state
            const currentState = thunkAPI.getState() as { projects: Project[] }
            const state = currentState.projects

            // Find the project and board
            const project = state.find(
                (product) => product.name.trim().toLowerCase() === productName
            )
            if (!project) throw new Error("Product doesn't exist")

            // const board = project.boards[task.boardIndex];
            const board = project.boards.find(
                (board) => board.boardId === board.boardId
            )

            if (!board) throw new Error('Board doesnot exist')

            // Create the new task object
            const newTask: Task = {
                taskIndex: board.tasks.length,
                ...task,
            }

            // Save the task via the backend service
            const savedTask = await productServerService.createNewTask(newTask)

            // Return the saved task, including project and board indices
            return {
                ...savedTask,
                projectIndex: task.projectIndex,
                boardIndex: task.boardIndex,
                boardId: task.boardId,
            }
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
            return thunkAPI.rejectWithValue(
                'Unknown error while creating the task'
            )
        }
    }
)

export const updateProductName = createAsyncThunk(
    'projects-update',
    async (productNameandId: ProductNameandId, thunkAPI) => {
        try {
            if (!productNameandId.productName.trim()) {
                throw new Error(
                    'Details were properly required while update the productName'
                )
            }
            // save to the database and return
            await productServerService.updateProduct(productNameandId)

            return { ...productNameandId }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Error'
            )
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'projects-delete',
    async (productId: DeleteProduct, thunkAPI) => {
        try {
            // save to the database and return
            await productServerService.deleteProduct(productId)
            return { ...productId }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error ? error.message : 'Error'
            )
        }
    }
)

export const updateBoardName = createAsyncThunk(
    'board-update',
    async (boardIdAndName: BoardIdAndName, thunkAPI) => {
        try {
            const productName = productUtil.getCurrentProductName()
            if (!productName) throw new Error('Product doesnot exist')
            const board =
                await productServerService.updateBoardName(boardIdAndName)
            if (!board) throw new Error('Cannot updated the board')
            return { ...board, productName }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Error while updating the boardName'
            )
        }
    }
)

export const deleteBoardById = createAsyncThunk(
    'board-delete',
    async (boardIdAndProjectIndex: BoardIdAndProjectIndex, thunkAPI) => {
        try {
            const isDeleted = await productServerService.deleteBoard(
                boardIdAndProjectIndex.boardId
            )
            if (isDeleted) {
                return { ...boardIdAndProjectIndex }
            }
            throw new Error('Some thing wrong while deleting the board')
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Something wrong while deleting the board'
            )
        }
    }
)

// from here to improve;
export const updateTaskById = createAsyncThunk(
    'task-update',
    async (taskUpdateDetails: TaskUpdateDetails, thunkAPI) => {
        try {
            const task: Task =
                await productServerService.updateTask(taskUpdateDetails)

            if (task) {
                return { ...task, boardId: taskUpdateDetails.boardId }
            }

            throw new Error('Some thing wrong while updating the task')
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Something wrong while updating the task'
            )
        }
    }
)

export const deleteTaskById = createAsyncThunk(
    'delete-task',
    async (taskDetails: TaskDeleteDetails, thunkAPI) => {
        try {
            if (taskDetails.taskId <= -1) throw new Error('Invalid task id')
            const isTaskDeleted = await productServerService.deleteTask(
                taskDetails.taskId
            )
            if (isTaskDeleted) {
                return { taskDetails }
            }
            throw new Error("Cann't deleted the task")
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Something wrong while deleting the task'
            )
        }
    }
)

export const changeCompleteStatusForBoard = createAsyncThunk(
    'change-complete-status-for-board',
    async (boardDetails: Status, thunkAPI) => {
        try {
            if (boardDetails.taskId <= -1) throw new Error('Invalid task id')
            const isComplete =
                await productServerService.checkCompleteOrNotCompleteBoard(
                    boardDetails.boardId,
                    boardDetails.status
                )
            return { isComplete, boardId: boardDetails.boardId }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Something wrong while updating the bord status'
            )
        }
    }
)

export const changeCompleteStatusForTask = createAsyncThunk(
    'change-complete-status-for-task',
    async (taskDetails: Status, thunkAPI) => {
        try {
            if (taskDetails.taskId <= -1) throw new Error('Invalid task id')
            const isComplete =
                await productServerService.checkCompleteOrNotCompleteTask(
                    taskDetails.taskId,
                    taskDetails.status
                )
            return {
                isComplete,
                boardId: taskDetails.boardId,
                taskId: taskDetails.taskId,
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Something wrong while updating the bord status'
            )
        }
    }
)

export const userProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<Project[]>) => {
            action.payload.forEach((project) => {
                project.index = state.length
                project.boards.forEach((board) => {
                    board.projectIndex = project.index
                })
                state.push(project)
            })
        },

        deleteProject: (state, action: PayloadAction<number>) => {
            return state.filter((project) => project.id !== action.payload)
        },
        updateProduct: (state, action: PayloadAction<ProductUpdateTypes>) => {
            const product = state.filter(
                (project) => project.id === action.payload.id
            )
            product[0].name = action.payload.name
        },
        deleteProjects: (state) => {
            state.length = 0
        },
        updateProject: (state, action: PayloadAction<Project>) => {
            const { id, boards } = action.payload
            const project = state.find((project) => project.id === id)
            if (project) {
                project.boards = boards
            } else {
                throw new Error('Project not found while updating it')
            }
        },

        addTaskUnderTheBoard: (state, action: PayloadAction<Task>) => {},
    },

    // handel async
    extraReducers: (builder) => {
        builder.addCase(addBoardUnderTheProject.fulfilled, (state, action) => {
            const { productName, ...board } = action.payload
            const project = state.find(
                (product) => product.name.trim().toLowerCase() === productName
            )
            if (!project)
                throw new Error(
                    "Cann't create the board because board doesnot exist"
                )

            if (project) {
                const boardWithIndex: Board = {
                    name: board.savedBoard.name,
                    projectIndex: project.index,
                    ...board.savedBoard,
                    boardIndex: project.boards.length,
                }
                project.boards.push(boardWithIndex)
            }
        })

        builder.addCase(addBoardUnderTheProject.rejected, (state, action) => {
            if (action.payload) {
                throw new Error(action.payload.toString())
            } else {
                throw new Error('Unknow error while creating the board')
            }
        })

        builder.addCase(createProject.fulfilled, (state, action) => {
            state.push(action.payload)
        })

        builder.addCase(createProject.rejected, (state, action) => {
            if (action.payload) {
                throw new Error(action.payload.toString())
            } else {
                throw new Error('Unknow error while createing the project')
            }
        })

        builder.addCase(createTask.fulfilled, (state, action) => {
            const { boardId } = action.payload
            const projectName = productUtil.getCurrentProductName()
            if (!projectName.trim()) throw new Error('No product name found')
            const project = state.find(
                (product) => product.name.trim().toLowerCase() === projectName
            )
            if (!project) throw new Error('Product doesnot exist')
            const board = project.boards.find(
                (board) => board.boardId === boardId
            )
            if (!board) return
            board.tasks.push(action.payload)
        })

        builder.addCase(updateProductName.fulfilled, (state, action) => {
            const { productId, productName } = action.payload
            const currentIdState = state.filter(
                (product) => product.id === productId
            )
            currentIdState[0].name = productName
        })
        builder.addCase(updateProductName.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : 'Cannot update the product Name'
            )
        })

        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const { productId } = action.payload
            return state.filter((product) => product.id !== productId)
        })

        builder.addCase(deleteProduct.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : 'Cannot delete the pro'
            )
        })

        // when updateBoardName success
        builder.addCase(updateBoardName.fulfilled, (state, action) => {
            const { name, boardId, productName } = action.payload
            const project = state.find(
                (product) => product.name.trim().toLowerCase() === productName
            )
            if (!project) throw new Error('Product doesnot exist')
            const board = project.boards.filter(
                (board) => board.boardId === boardId
            )
            board[0].name = name
        })

        // when updateBoardName failed
        builder.addCase(updateBoardName.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : 'Cannot update the boardName'
            )
        })

        builder.addCase(deleteBoardById.fulfilled, (state, action) => {
            const { projectIndex, boardId } = action.payload
            const project = state[projectIndex]
            project.boards = project.boards.filter(
                (board) => board.boardId !== boardId
            )
            return state
        })
        builder.addCase(deleteBoardById.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : "Sorry can't delete the board try again"
            )
        })

        builder.addCase(updateTaskById.fulfilled, (state, action) => {
            const task = action.payload
            const projectName = productUtil.getCurrentProductName()
            if (!projectName)
                throw new Error('Cannot found the project wiht name')
            const project = state.find(
                (project) =>
                    project.name.toLowerCase().trim() ===
                    projectName.trim().toLowerCase()
            )
            if (!project)
                throw new Error(
                    'Project doesnot found or incorrect project name'
                )
            // const board = project.boards[task.boardIndex];
            const board = project.boards.find(
                (currentBoard) => currentBoard.boardId === task.boardId
            )
            if (!board) throw new Error("board doesn't exist")
            if (!board)
                throw new Error('Board not found or incorrect board index')
            const oldTask = board.tasks.find((t) => t.taskId === task.taskId)
            if (!oldTask)
                throw new Error('Task not found or index is incorrect')
            oldTask.name = task.name
            oldTask.content = task.content
        })

        builder.addCase(updateTaskById.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : "Sorry can't update the task try again"
            )
        })

        builder.addCase(deleteTaskById.fulfilled, (state, action) => {
            const { taskDetails } = action.payload
            const projectName = productUtil.getCurrentProductName()
            if (!projectName)
                throw new Error('Cannot found the project wiht name')
            const project = state.find(
                (project) =>
                    project.name.toLowerCase().trim() ===
                    projectName.trim().toLowerCase()
            )
            if (!project)
                throw new Error(
                    'Project doesnot found or incorrect project name'
                )
            const findBoardById = project.boards.find(
                (board) => board.boardId === taskDetails.boardId
            )
            if (!findBoardById) throw new Error("Can't found board")
            findBoardById.tasks = findBoardById.tasks.filter(
                (task) => task.taskId !== taskDetails.taskId
            )
            return state
        })

        builder.addCase(deleteTaskById.rejected, (state, action) => {
            throw new Error(
                action.payload
                    ? action.payload.toString()
                    : "Sorry can't delete the task try again"
            )
        })

        builder.addCase(
            changeCompleteStatusForTask.fulfilled,
            (state, action) => {
                const { isComplete, taskId, boardId } = action.payload
                const projectName = productUtil.getCurrentProductName()
                const project = state.find(
                    (project) =>
                        project.name.toLowerCase().trim() ===
                        projectName.trim().toLowerCase()
                )

                if (!project)
                    throw new Error(
                        "Project doesn't found or incorrect project name"
                    )
                const findBoardById = project.boards.find(
                    (board) => board.boardId === boardId
                )
                if (!findBoardById) throw new Error("Can't found board")

                findBoardById.tasks = findBoardById.tasks.map(
                    (task) =>
                        task.taskId === taskId
                            ? { ...task, complete: isComplete } // Return a new object with updated 'complete' status
                            : task // Return the unchanged task
                )
            }
        )

        builder.addCase(
            changeCompleteStatusForTask.rejected,
            (state, action) => {
                throw new Error(
                    action.payload
                        ? action.payload.toString()
                        : 'Sorry Some thing wrong try again by reloading the page'
                )
            }
        )

        builder.addCase(
            changeCompleteStatusForBoard.fulfilled,
            (state, action) => {
                const { isComplete, boardId } = action.payload
                const projectName = productUtil.getCurrentProductName()
                const project = state.find(
                    (project) =>
                        project.name.toLowerCase().trim() ===
                        projectName.trim().toLowerCase()
                )

                if (!project)
                    throw new Error(
                        "Project doesn't found or incorrect project name"
                    )

                project.boards = project.boards.map(
                    (board) =>
                        board.boardId === boardId
                            ? { ...board, complete: isComplete } // Return a new object with updated 'complete' status
                            : board // Return the unchanged task
                )
            }
        )
    },
})

export const {
    deleteProject,
    updateProduct,
    updateProject,
    addProducts,
    addTaskUnderTheBoard,
    deleteProjects,
} = userProjectSlice.actions

export default userProjectSlice.reducer
