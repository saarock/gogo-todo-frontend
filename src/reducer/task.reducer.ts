// Define action types
export enum TaskActionTypes {
  SET_TASK_NAME = "SET_TASK_NAME",
  SET_TASK_DESC = "SET_TASK_DESC",
  DOES_USER_WANT_TO_ADD_TASK = "DOES_USER_WANT_TO_ADD_TASK",
  DOES_USER_WANT_TO_UPDATE_TASK_TITLE = "DOES_USER_WANT_TO_UPDATE_TASK_TITLE",
  DOES_USER_WANT_TO_UPDATE_TASK_DESC= "DOES_USER_WANT_TO_UPDATE_TASK_DESC"
}

// Define state type
interface TaskState {
  taskName: string;
  taskDesc: string;
  isUserWantToAddTask: string;
  isUserWantToUpdateTheTaskTitle: boolean
  isUserWantToUpdateTheTaskDesc: boolean
  // Add more state properties as needed
}

// Define action types
type Action =
  | { type: TaskActionTypes.SET_TASK_NAME; payload: string }
  | { type: TaskActionTypes.SET_TASK_DESC; payload: string }
  | { type: TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK; payload: string }
  | {type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_TITLE, payload: boolean}
  | {type: TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_DESC, payload: boolean}

export const taskReducer = (state: TaskState, action: Action): TaskState => {
  switch (action.type) {
    case TaskActionTypes.SET_TASK_NAME:
      return { ...state, taskName: action.payload };
    case TaskActionTypes.SET_TASK_DESC:
      return { ...state, taskDesc: action.payload };

    case TaskActionTypes.DOES_USER_WANT_TO_ADD_TASK:
      return { ...state, isUserWantToAddTask: action.payload };
    case TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_TITLE:
      return {...state, isUserWantToUpdateTheTaskTitle: action.payload};

    case TaskActionTypes.DOES_USER_WANT_TO_UPDATE_TASK_DESC: 
      return {...state, isUserWantToUpdateTheTaskDesc: action.payload}
    default:
      return state;
  }
};
