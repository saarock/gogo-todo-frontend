export enum TypeOfBoard {
    IS_WANT_TO_SEE_OPTIONS = 'IS_WANT_TO_SEE_OPTIONS',
    IS_WANT_TO_UPDATE_BOARDNAME = 'IS_WANT_TO_UPDATE_BOARDNAME',
    WANT_TOSET_NEW_BOARD_NAME = 'WANT_TOSET_NEW_BOARD_NAME',
    SET_BOARD_ID = 'SET_BOARD_ID',
}

export interface BoardStateTypes {
    isWantToSeeOptions: boolean
    isWantToUpdateBoardName: boolean
    newBoardName: string
    idOfBoard: number
}

export const boardInitialState: BoardStateTypes = {
    isWantToSeeOptions: false,
    newBoardName: '',
    idOfBoard: -1,
    isWantToUpdateBoardName: false,
}

export type BoardActions =
    | { type: TypeOfBoard.IS_WANT_TO_SEE_OPTIONS; payload: boolean }
    | { type: TypeOfBoard.WANT_TOSET_NEW_BOARD_NAME; payload: string }
    | { type: TypeOfBoard.SET_BOARD_ID; payload: number }
    | { type: TypeOfBoard.IS_WANT_TO_UPDATE_BOARDNAME; payload: boolean }

export const boardReducer = (
    state: BoardStateTypes,
    action: BoardActions
): BoardStateTypes => {
    switch (action.type) {
        case TypeOfBoard.IS_WANT_TO_SEE_OPTIONS:
            return {
                ...state,
                isWantToSeeOptions: action.payload,
            }
        case TypeOfBoard.WANT_TOSET_NEW_BOARD_NAME:
            return {
                ...state,
                newBoardName: action.payload,
            }
        case TypeOfBoard.SET_BOARD_ID:
            return {
                ...state,
                idOfBoard: action.payload,
            }
        case TypeOfBoard.IS_WANT_TO_UPDATE_BOARDNAME:
            return {
                ...state,
                isWantToUpdateBoardName: action.payload,
            }

        default:
            return state
    }
}
