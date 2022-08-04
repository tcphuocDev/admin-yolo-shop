import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
  productSells: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_PRODUCT:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_PRODUCT:
    case types.DELETE_PRODUCT:
    case types.UPDATE_PRODUCT:
      return state;
    case types.DETAIL_PRODUCT:
      return {
        ...state,
        item: action.data,
      };
    case types.LIST_PRODUCT_SELL:
      return {
        ...state,
        productSells: action.data.items,
        meta: action.data.meta,
      };
    default:
      return state;
  }
};

export default productReducer;
