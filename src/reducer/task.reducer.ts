// Define action types
export enum TaskActionTypes {
  SET_TASK_NAME = "SET_TASK_NAME",
  SET_TASK_DESC = "SET_TASK_DESC",
  DOES_USER_WANT_TO_ADD_TASK = "DOES_USER_WANT_TO_ADD_TASK",
}

// Define state type
interface TaskState {
  taskName: string;
  taskDesc: string;
  isUserWantToAddTask: string;
  // Add more state properties as needed
}

// Define action types
type Action =
  | { type: TaskActionTypes.SET_TASK_NAME; payload: string }
  | { type: TaskActionTypes.SET_TASK_DESC; payload: string }
  | { type: TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK; payload: string };

export const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case TaskActionTypes.SET_TASK_NAME:
      // alert("name case")
      return { ...state, taskName: action.payload };
    case TaskActionTypes.SET_TASK_DESC:
      return { ...state, taskDesc: action.payload };

    case TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK:
      return { ...state, isUserWantToAddTask: action.payload };
    default:
      return state;
  }
};
