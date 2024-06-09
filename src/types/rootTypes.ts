import { AuthState } from "./auth";
import { Project } from "./user";

export interface RootState {
    auth: AuthState;
    projects: Project[];
}