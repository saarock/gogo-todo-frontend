export enum ProductActionTypes {
  CREATE_NEW_PRODUCT = "CREATE_NEW_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  IS_USER_WANT_TO_CREATE_PRODUCT = "IS_USER_WANT_TO_CREATE_PRODUCT",
}

interface ProductState {
  productTitleOrName: string;
  isUserWantToCreateTheProduct: boolean;
}

type Action =
  | { type: ProductActionTypes.CREATE_NEW_PRODUCT; payload: string }
  | { type: ProductActionTypes.UPDATE_PRODUCT; payload: string }
  | {
      type: ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT;
      payload: boolean;
    };

export const productReducer = (state: ProductState, action: Action) => {
  switch (action.type) {
    case ProductActionTypes.CREATE_NEW_PRODUCT:
      return { ...state, productTitleOrName: action.payload };
    case ProductActionTypes.IS_USER_WANT_TO_CREATE_PRODUCT:
      return { ...state, isUserWantToCreateTheProduct: action.payload };
    default:
      return state;
  }
};
