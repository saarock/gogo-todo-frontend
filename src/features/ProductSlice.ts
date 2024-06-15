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
import { Project, Board, Task, ProductUpdateTypes } from "../types";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
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
      const isDuplicateName = project.boards.some(
        (currentBoard) =>
          currentBoard.name.trim().toLowerCase() ===
          board.name.trim().toLowerCase()
      );

      if (isDuplicateName) {
        throw new Error("Board Name Already Exists");
      }

      return board;
    } catch (error) {
      if (error instanceof Error) {
  
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown errror");
    }
  }
);



// Create slice
export const userProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      const currentProjectName = action.payload.name;
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


  // insertion in the database

  // ; (async () => {
  //   try {
  //     const responseData = await productServerService.createNewTask(task);
  //     const createdTask: Task = await responseData.data;
  //     task = {
  //       ...task,
  //       taskId: createdTask.taskId,
  //     }
  //     dispatch(addTaskUnderTheBoard(task));
  //     toast.success("Task Added");
  //     taskDispatch({
  //       type: TaskActionTypes.SET_TASK_NAME,
  //       payload: "",
  //     });
  //     taskDispatch({
  //       type: TaskActionTypes.SET_TASK_DESC,
  //       payload: "",
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //       return;
  //     }
  //     toast.error("Unknown error");
  //   } 
  // })();



  // insertion in the database end

      const newProject: Project = {
        ...action.payload,
        index: state.length,
   
      };
      state.push(newProject);
    },
    addProducts: (state, action: PayloadAction<Project[]>) => {

      // let index =0;
      action.payload.forEach((project) => {
        project.index = state.length;
      state.push(project);
        
      })
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      return state.filter((project) => project.id !== action.payload);
    },
    updateProduct : (state , action: PayloadAction<ProductUpdateTypes>) => {
      const product =  state.filter((project) => project.id === action.payload.id);
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

    addTaskUnderTheBoard : (state, action: PayloadAction<Task>) => {
      
      const newTask = action.payload;
  
      if (newTask.name === "") {
        throw new Error("Task Name Required")
      }
      const project = state[newTask.projectIndex];
      console.log("strting")
      console.log(project)
      if (!project) {
        throw new Error("Project not found")
      }
      const board =project.boards[newTask.boardIndex];
      if (!board) {
        throw new Error("Board doesn't found");
      }
        
      const task:Task = {
        taskIndex: board.tasks.length,
        ...newTask

      }
      board.tasks.push(task)
              
    }
  },

  // handel async
  extraReducers: (builder) => {
    try {
    builder.addCase(addBoardUnderTheProject.fulfilled, (state, action) => {
      const board = action.payload;
      if (board.projectIndex === undefined) return;
      const project = state[board.projectIndex];
      if (project) {
        const newBoard:Board = {
          ...board,
          boardIndex: project.boards.length ,
        };
        project.boards.push(newBoard);
      }
    });
  } catch(error) {
    if (error instanceof Error) {
      throw error.message;
    }
    throw new Error("Unknown errro")

  }
    builder.addCase(addBoardUnderTheProject.rejected, (state, action) => {
      if (action.payload) {
        toast.error(action.payload.toString());
      } else {
        toast.error("Unknown error");
      }
    });
  },
});

export const { addProject, deleteProject, updateProduct, updateProject, addProducts,  addTaskUnderTheBoard, deleteProjects } =
  userProjectSlice.actions;

export default userProjectSlice.reducer;
