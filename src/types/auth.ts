import { User } from "./user";

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
  }


export interface LoginPayload {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface LoginPayload {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
  


  