// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Project, Board, Task } from "../types";
// import { v4 as uuidv4 } from "uuid";

// const initialState: Project[] = [];

// export const userProjectSlice = createSlice({
//   name: "projects",
//   initialState,
//   reducers: {
//     addProject: (state, action: PayloadAction<Project>) => {
//       const currentProjectName = action.payload.name;
//       if (currentProjectName?.trim() === "") {
//         throw new Error("Project Name Required");
//       }
//       const isSame = state.findIndex(
//         (currentProject) =>
//           currentProject.name?.toLowerCase().trim() ===
//           currentProjectName?.toLowerCase().trim()
//       );

//       if (isSame !== -1) {
//         throw new Error("Project name already exist");
//       }

//       const newIndex = state.length;

//       const newProject: Project = {
//         id: uuidv4(),
//         name: currentProjectName,
//         index: newIndex,
//         boards: [],
//       };
//       state.push(newProject);
//     },
//     addProducts: (state, action: PayloadAction<Project[]>) => {
//       state.push(...action.payload);
//     },

//     // adding board
//     addBoardUnderTheProject: (state, action: PayloadAction<Board>) => {
//       try {
//         const board = action.payload;

//         if (board.projectIndex === undefined) {
//           throw new Error("Project Index Not Found");
//         }

//         // works on the O(1) beacuse of the index
//         const isExist = state[board.projectIndex];

//         if (!isExist) {
//           throw new Error("Project doesnot exist");
//         }

//         const foundBoard = isExist.boards;

//         async function search(): Promise<boolean> {
//           for (
//             let index = Math.ceil(foundBoard.length / 2);
//             index <= isExist.boards.length;
//             index++
//           ) {
//             if (
//               foundBoard[index].name.trim().toLowerCase() ===
//               board.name.trim().toLowerCase()
//             )
//               return true;
//           }
//           return false;
//         }

//         // Have to improve the timeCOmplexity by using the mutlithreads and async programming concept
//         if (foundBoard.length > 4) {

//         //first search
//           const searchPromises = new Promise<boolean>((resolve, reject) => {
//             search()
//               .then((result) => {
//                 resolve(result);
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           });

//           searchPromises
//             .then((trueOrFalse) => {
//               if (trueOrFalse) {
//                 for (let index =foundBoard.length-1; index>=0; index--) {
//                   if (foundBoard[index].name.trim().toLowerCase() === board.name.trim().toLowerCase() && foundBoard[index-1].name.trim().toLowerCase() === board.name.trim().toLowerCase()) {
//                     alert("yes")
//                     foundBoard.splice(0, index-1)
//                   }else {
//                     alert("no")
//                   }
//                 }
//                 alert("what")
//                 throw new Error("Board Name Already Exists from async");
//               }
//             })
//             .catch((error) => {
//               // Handle promise rejection error
//               throw new Error(`Error during asynchronous operation: ${error}`);
//             });

//             //second search
//           (() => {
//             for (
//               let index = 0;
//               index <= Math.floor(foundBoard.length) / 2;
//               index++
//             ) {
//               if (
//                 foundBoard[index].name.trim().toLowerCase() ===
//                 board.name.trim().toLowerCase()
//               ) {
//                 throw new Error("Board Name Already Exist");
//               }
//             }
//           })();
//         } else {
//           const isSame = foundBoard.find(
//             (currentBoard) =>
//               currentBoard.name.trim().toLowerCase() ===
//               board.name.trim().toLowerCase()
//           );

//           if (isSame) {
//             throw new Error("Board Name Already Exist");
//           }
//         }

//         const boardUniqueID = uuidv4();
//         const newIndex = foundBoard.length;

//         const {
//           projectId,
//           boardId = boardUniqueID,
//           boardIndex = newIndex,
//           ...newBoard
//         } = action.payload;

//         const project = state.find((project) => project.id === projectId);

//         if (project) {
//           project.boards.push(newBoard);
//         } else {
//           throw new Error("Project Not found");
//         }
//       } catch (error) {
//         if (error instanceof Error) {

//           throw new Error(error.message);
//         }
//       }
//     },

//     // adding board end;

//     addTaskUnderTheBoard: (state, action: PayloadAction<Task>) => {
//       // const isSame = state.find(currentProject)
//     },

//     deleteProject: (state, action: PayloadAction<string>) => {
//       return state.filter((project) => project.id !== action.payload);
//     },

//     updateProject: (state, action: PayloadAction<Project>) => {
//       const { id, boards } = action.payload;
//       const project = state.find((project) => project.id === id);
//       if (project) {
//         project.boards = boards;
//       } else {
//         throw new Error("Project not found while updating it");
//       }
//     },
//   },
// });

// export const {
//   addProject,
//   addBoardUnderTheProject,
//   deleteProject,
//   updateProject,
//   addProducts,
// } = userProjectSlice.actions;

// export default userProjectSlice.reducer;

// // Define the addBoardUnderTheProject slice

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
} from "../types";
import { productServerService } from "../services";

// Initial state
const initialState: Project[] = [];

// Async function to search for a duplicate board name (For the future use)
const searchBoard = async (
  boards: Board[],
  boardName: string
): Promise<boolean> => {
  for (
    let index = Math.ceil(boards.length / 2);
    index < boards.length;
    index++
  ) {
    if (
      boards[index].name.trim().toLowerCase() === boardName.trim().toLowerCase()
    ) {
      return true;
    }
  }
  return false;
};

// Async thunk to handle adding a board
export const addBoardUnderTheProject = createAsyncThunk(
  "projects/addBoardUnderTheProject",
  async (board: Board, thunkAPI) => {
    try {
      // Extract the project index from the board payload
      const { projectIndex } = board;

      // Retrieve the current state
      const currentState = thunkAPI.getState() as { projects: Project[] };
      const state = currentState.projects;

      // Check if the project index is valid
      if (projectIndex === undefined || !state[projectIndex]) {
        throw new Error("Invalid project index");
      }

      const project = state[projectIndex];

      // Check for duplicate board names
      const isDuplicateName = await project.boards.some(
        (currentBoard) =>
          currentBoard.name.trim().toLowerCase() ===
          board.name.trim().toLowerCase()
      );

      if (isDuplicateName) {
        throw new Error("Board Name Already Exists");
      }

      const savedBoard = await productServerService.createNewBoard(board);

      return { savedBoard, projectIndex };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error whiel creating the board");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: Project, thunkAPI) => {
    try {
      const currentProjectName = project.name;
      const currentState = thunkAPI.getState() as { projects: Project[] };
      const state = currentState.projects;
      if (currentProjectName?.trim() === "") {
        throw new Error("Project Name Required");
      }
      const isSame = state.findIndex(
        (currentProject) =>
          currentProject.name?.toLowerCase().trim() ===
          currentProjectName?.toLowerCase().trim()
      );
      if (isSame !== -1) {
        throw new Error("Project name already exist");
      }

      // alert(state.length)
      const updatedProject: Project = {
        ...project,
        // index: state.length
      };

      let projectDetails: Project = await productServerService.createNewProduct(
        updatedProject
      );
      projectDetails = {
        ...projectDetails,
        index: state.length,
      };

      return projectDetails;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue(
        "Unknown error while creting the project"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "projects/board/createTask",
  async (task: Task, thunkAPI) => {
    try {
      // Validate task name
      if (task.name === "") {
        throw new Error("Task Name Required");
      }

      // Retrieve the current state
      const currentState = thunkAPI.getState() as { projects: Project[] };
      const state = currentState.projects;

      // Find the project and board
      const project = state[task.projectIndex];
      if (!project) {
        throw new Error("Project not found");
      }

      const board = project.boards[task.boardIndex];
      if (!board) {
        throw new Error("Board not found");
      }

      // Create the new task object
      const newTask: Task = {
        taskIndex: board.tasks.length,
        ...task,
      };

      // Save the task via the backend service
      const savedTask = await productServerService.createNewTask(newTask);

      // Return the saved task, including project and board indices
      return {
        ...savedTask,
        projectIndex: task.projectIndex,
        boardIndex: task.boardIndex,
      };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error while creating the task");
    }
  }
);

export const updateProductName = createAsyncThunk(
  "projects-update",
  async (productNameandId: ProductNameandId, thunkAPI) => {
    try {
      if (!productNameandId.productName.trim()) {
        throw new Error(
          "Details were properly required while update the productName"
        );
      }
      // save to the database and return
      await productServerService.updateProduct(productNameandId);

      return { ...productNameandId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Error"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "projects-delete",
  async (productId: DeleteProduct, thunkAPI) => {
    try {
      // save to the database and return
      await productServerService.deleteProduct(productId);
      return { ...productId };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Error"
      );
    }
  }
);


export const updateBoardName = createAsyncThunk(
  "board-update",
  async (boardIdAndName: BoardIdAndName, thunkAPI) => {
    try {
      
      const board = await productServerService.updateBoardName(boardIdAndName);
      if (!board) throw new Error("Cannot updated the board");
      return {...board, projectIndex: boardIdAndName.projectIndex };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error? error.message : "Error while updating the boardName"
      )
    }
  }
);

export const deleteBoardById = createAsyncThunk(
  "board-delete",
  async (boardIdAndProjectIndex:BoardIdAndProjectIndex, thunkAPI) => {
    try {

      const isDeleted = await productServerService.deleteBoard(boardIdAndProjectIndex.boardId);
      if (isDeleted) {
        return {...boardIdAndProjectIndex}
      } 
      throw new Error("Some thing wrong while deleting the board");
    } catch(error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Something wrong while deleting the board"
      )
    }
  }
)

export const updateTaskById = createAsyncThunk(
  "task-update",
  async (taskUpdateDetails: TaskUpdateDetails, thunkAPI) => {
    try {
      const task: Task = await productServerService.updateTask(taskUpdateDetails);

      if (task) {
        return {...task};
      }
  
      throw new Error("Some thing wrong while updating the task");
    } catch(error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Something wrong while updating the task"
      )
    }
  }
)


export const deleteTaskById = createAsyncThunk(
  "delete-task",
  async (taskDetails: TaskDeleteDetails, thunkAPI) => {
    try {
    if (taskDetails.taskId <= -1) throw new Error("Invalid task id");
    const isTaskDeleted = await productServerService.deleteTask(taskDetails.taskId);
    if (isTaskDeleted) {
      return {taskDetails};
    }
    throw new Error("Cann't deleted the task");
  } catch(error) {
    return thunkAPI.rejectWithValue(
      error instanceof Error? error.message : "Something wrong while deleting the task"
    )
  }
  }
)


export const userProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Project[]>) => {
      action.payload.forEach((project) => {
        project.index = state.length;
        project.boards.forEach((board) => {
          board.projectIndex = project.index;
        });
        state.push(project);
      });
    },

    deleteProject: (state, action: PayloadAction<number>) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductUpdateTypes>) => {
      const product = state.filter(
        (project) => project.id === action.payload.id
      );
      product[0].name = action.payload.name;
    },
    deleteProjects: (state) => {
      state.length = 0;
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const { id, boards } = action.payload;
      const project = state.find((project) => project.id === id);
      if (project) {
        project.boards = boards;
      } else {
        throw new Error("Project not found while updating it");
      }
    },

    addTaskUnderTheBoard: (state, action: PayloadAction<Task>) => {},
  },

  // handel async
  extraReducers: (builder) => {
    builder.addCase(addBoardUnderTheProject.fulfilled, (state, action) => {
      const { projectIndex, ...board } = action.payload;

      if (projectIndex === undefined) return;

      const project = state[projectIndex];

      if (project) {
        const boardWithIndex: Board = {
          name: board.savedBoard.name,
          projectIndex: project.index,
          ...board.savedBoard,
          boardIndex: project.boards.length,
        };
        project.boards.push(boardWithIndex);
      }
    });

    builder.addCase(addBoardUnderTheProject.rejected, (state, action) => {
      if (action.payload) {
        throw new Error(action.payload.toString());
      } else {
        throw new Error("Unknow error while creating the board");
      }
    });

    builder.addCase(createProject.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(createProject.rejected, (state, action) => {
      if (action.payload) {
        throw new Error(action.payload.toString());
      } else {
        throw new Error("Unknow error while createing the project");
      }
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      const { projectIndex, boardIndex, ...task } = action.payload;
      const project = state[projectIndex];
      if (!project) return;
      const board = project.boards[boardIndex];
      if (!board) return;
      board.tasks.push(task);
    });

    builder.addCase(updateProductName.fulfilled, (state, action) => {
      const { productId, productName } = action.payload;
      const currentIdState = state.filter(
        (product) => product.id === productId
      );
      currentIdState[0].name = productName;
    });
    builder.addCase(updateProductName.rejected, (state, action) => {
      throw new Error(
        action.payload
          ? action.payload.toString()
          : "Cannot update the product Name"
      );
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const { productId } = action.payload;
      return state.filter((product) => product.id !== productId );
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      throw new Error(
        action.payload
          ? action.payload.toString()
          : "Cannot delete the pro"
      );
    });


    builder.addCase(updateBoardName.fulfilled, (state, action) => {
      const {name, boardId, projectIndex}  = action.payload;
      if (projectIndex === undefined) throw new Error("Project Error not found");
      const project = state[projectIndex];  
      const board = project.boards.filter((board) => board.boardId === boardId);
      board[0].name = name;
    });


    builder.addCase(updateBoardName.rejected, (state, action) => {
      throw new Error(
        action.payload
        ? action.payload.toString()
        : "Cannot update the boardName"
      )
    });
    builder.addCase(deleteBoardById.fulfilled, (state, action) => {
      const {projectIndex, boardId} = action.payload;
      const project = state[projectIndex];
      project.boards = project.boards.filter((board) => board.boardId !== boardId);
      return state;
    });
    builder.addCase(deleteBoardById.rejected, (state, action) => {
      throw new Error(
        action.payload?
        action.payload.toString()
        : "Sorry can't delete the board try again"
      )
    });

    builder.addCase(updateTaskById.fulfilled, (state, action) => {
      const task = action.payload;
      const projectNameFromPath =window.location.pathname.trim();
      const projectName = projectNameFromPath.split("/").pop();
      if (!projectName) throw new Error("Cannot found the project wiht name")
      const project = state.find((project) => project.name.toLowerCase().trim() === projectName.trim().toLowerCase());
      if (!project) throw new Error("Project doesnot found or index is not correct");
      const board = project.boards[task.boardIndex];
      if(!board) throw new Error("Board not found or incorrect board index");
      const oldTask = board.tasks.find((t) => t.taskId === task.taskId);
      if (!oldTask) throw new Error("Task not found or index is incorrect");      
      oldTask.name = task.name;
      oldTask.content = task.content;

    });

    builder.addCase(updateTaskById.rejected, (state, action) => {
      throw new Error(
        action.payload?
        action.payload.toString()
        : "Sorry can't update the task try again"
      )
    });

    builder.addCase(deleteTaskById.fulfilled, (state, action) => {
      const {taskDetails} = action.payload;
      const projectNameFromPath =window.location.pathname.trim();
      const projectName = projectNameFromPath.split("/").pop();
      if (!projectName) throw new Error("Cannot found the project wiht name");
      const project = state.find((project) => project.name.toLowerCase().trim() === projectName.trim().toLowerCase());
      if (!project) throw new Error("Project doesnot found or index is not correct");
      const findBoardById = project.boards.find((board) => board.boardId === taskDetails.boardId);
      if (!findBoardById) throw new Error("Can't found baord");
      findBoardById.tasks = findBoardById.tasks.filter((task) => task.taskId !== taskDetails.taskId);
      return state;

    });

    builder.addCase(deleteTaskById.rejected , (state,action) => {
      throw new Error(
        action.payload?
        action.payload.toString()
        : "Sorry can't delete the task try again"
      )
    })
  },
});

export const {
  deleteProject,
  updateProduct,
  updateProject,
  addProducts,
  addTaskUnderTheBoard,
  deleteProjects,
} = userProjectSlice.actions;

export default userProjectSlice.reducer;
