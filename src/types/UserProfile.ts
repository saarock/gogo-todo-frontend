import { User } from './user'

/**
 * @note : related to the user profile all the types found here basically props types;
 */
export interface ProfileProps {
    userData: User
    onClickButton?: () => void
}
