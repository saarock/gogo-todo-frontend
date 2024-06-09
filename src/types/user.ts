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

// helper
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


// Define the Task interface
export interface Task {
  taskId?: string;
  name?: string;
  content? :string;
  boardId?: string;
  taskIndex?: number;
  boardIndex: number;
  projectIndex: number;

  // Define properties for a task
}

// Define the Board interface which contains tasks
export interface Board {
  boardId? : string;
  projectId?: string;
  name: string;
  tasks: Task[];
  projectIndex? :number;
  boardIndex?: number;
}

// Define the Project interface which contains boards
export interface Project {
  id?:string;
  name?:string;
  boards: Board[];
  index? :number;
}

// // Define the UserProject interface which extends Project
// export interface Project {
//   project?: Board[];
//   // You can add any additional properties specific to user projects here
// }

export interface UserProject {
  projects?: Project[];
}