export enum UserActionType {
    IS_USER_WANT_TO_CHANGE_FULL_NAME = ' IS_USER_WANT_TO_CHANGE_FULL_NAME',
    SET_USER_FULL_NAME = 'SET_USER_FULL_NAME',
}

export interface UserState {
    isUserWantToUpdateTheFullName: boolean
    userNewFullName: string
}

export const userInitialState: UserState = {
    isUserWantToUpdateTheFullName: false,
    userNewFullName: '',
}

type Action =
    | {
          type: UserActionType.IS_USER_WANT_TO_CHANGE_FULL_NAME
          payload: boolean
      }
    | { type: UserActionType.SET_USER_FULL_NAME; payload: string }

export const userReducer = (state: UserState, action: Action) => {
    switch (action.type) {
        case UserActionType.IS_USER_WANT_TO_CHANGE_FULL_NAME:
            return { ...state, isUserWantToUpdateTheFullName: action.payload }
        case UserActionType.SET_USER_FULL_NAME:
            return { ...state, userNewFullName: action.payload }
        default:
            return state
    }
}
