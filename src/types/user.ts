export interface User {
    id?: string;
    fullName: string;
    email: string;
    role?: string;
    createdAt?: string;
    lastModifiedAt?: string
    password: string;
      // Add other user properties here
  }
  


  export interface UserResponse {
    type : string;
    message: string;
    status: number;
    user: User;

  }


  export interface Email {
    email : string;
  }


  export interface Otp {
    otp : bigint
  }

  export interface RegisterRequest {
    user: User
    otp: bigint
  
  }