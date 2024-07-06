/**
 * @note : At this file we can found all the types related to the user, include product, boards and task also;
 */


/**
 * User types for register, login , Request and Resposne start.
 */
export interface User {
  id?: string;
  fullName: string;
  email: string;
  role?: string;
  createdAt?: string;
  lastModifiedAt?: string;
  password?: string;
}

export interface UserResponse {
  type: string;
  message: string;
  status: number;
  user: User;
}

export interface Email {
  email: string;
}

export interface Otp {
  otp: bigint;
}

export interface RegisterRequest {
  user: User;
  otp: bigint;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

// also works for the error response;
export interface GlobalResponseHelper {
  status: number;
  type: string;
  message: string;
}

export interface OtpResponse extends GlobalResponseHelper {
  email?: string;
}

export interface RegisterResponseSuccess extends GlobalResponseHelper {
  user?: User;
  tokens?: Tokens;
}

/**
 * @note : User types for register, login and Request and Response end.
 */

/**
 * (CLIENT TYPES)
 *  @note : types for product include board and task start
 * 
 */
// Define the Task interface
export interface Task {
  taskId?: number;
  name: string;
  content? :string;
  boardId: number;
  taskIndex?: number;
  boardIndex: number;
  projectIndex: number;
  index?: number;
  createdAt? : string;
  updatedAt?:string;

  // Define properties for a task
}

// Define the Board interface which contains tasks
export interface Board {
  boardId? : number;
  projectId?: number;
  name: string;
  tasks: Task[];
  projectIndex? :number;
  boardIndex?: number;
  createdAt?: string;
  updatedAt?: string;
  // projectName?: string;
}

// Define the Project interface which contains boards
export interface Project {
  id?: number;
  name:string;
  boards: Board[];
  index? :number;
  createdDate?: string;
  updatedAt?:string;
  userId?:string;
}

// // Define the UserProject interface which extends Project
// export interface Project {
//   project?: Board[];
//   // You can add any additional properties specific to user projects here
// }

export interface UserProject {
  projects?: Project[];
}


// productUpdateTypes
export interface ProductUpdateTypes {
  id: number,
  name: string,
}


/**
 * (CLIENT TYPES)
 *  @note : types for product include board and task end
 * 
 */




/**
 * (SERVER MODELS)
 *  @note : types for product include board and task start
 */


/**
 * (SERVER TYPES)
 * @note : types for product include board and task end
 */


export interface ProductNameandId {
  productName: string;
  productId: number;

}
export interface DeleteProduct {
  productId: number;

}

export interface BoardIdAndName {
  boardId: number;
  boardName: string;
  projectIndex: number;
}


export interface BoardIdAndProjectIndex {
  boardId:number;
  projectIndex: number;
}



export interface TaskUpdateDetails {
  taskTitle: string;
  taskContent: string;
  taskId: number;
  boardId: number;
}


export interface TaskDeleteDetails {
  boardId: number;
  taskId: number
}