export enum ProductActionTypes {
    CREATE_NEW_PRODUCT = 'CREATE_NEW_PRODUCT',
    IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT = 'IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT',
    UPDATE_PRODUCT = 'UPDATE_PRODUCT',
    IS_USER_WANT_TO_CREATE_PRODUCT = 'IS_USER_WANT_TO_CREATE_PRODUCT',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
}

export interface ProductState {
    productTitleOrName?: string
    isUserWantToCreateTheProduct?: boolean
    deletedProduct?: string
    isUserWantToSeeOptions?: {
        productId?: number
        isWantToSeeOptions?: boolean
        isUserWantToUpdate?: boolean
    }
}

type Action =
    | { type: ProductActionTypes.CREATE_NEW_PRODUCT; payload: string }
    | { type: ProductActionTypes.UPDATE_PRODUCT; payload: string }
    | {
          type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT
          payload: boolean
      }
    | {
          type: ProductActionTypes.DELETE_PRODUCT
          payload: string
      }
    | {
          type: ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT
          payload: {
              productId?: number
              isWantToSeeOptions?: boolean
              isUserWantToUpdate?: boolean
          }
      }

export const productReducer = (state: ProductState, action: Action) => {
    switch (action.type) {
        case ProductActionTypes.CREATE_NEW_PRODUCT:
            return { ...state, productTitleOrName: action.payload }
        case ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT:
            return { ...state, isUserWantToCreateTheProduct: action.payload }
        case ProductActionTypes.DELETE_PRODUCT:
            return { ...state, deletedProduct: action.payload }
        case ProductActionTypes.IS_USER_WANT_TO_SEE_THE_OPTIONS_OF_THE_PRODUCT:
            return { ...state, isUserWantToSeeOptions: action.payload }
        default:
            return state
    }
}
