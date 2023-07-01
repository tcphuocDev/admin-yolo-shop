import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_SIZE:
      return {
        ...state,
        items: action.data,
        meta: action.data.meta,
      };
    case types.CREATE_SIZE:
    case types.UPDATE_SIZE:
      return state;
    case types.DETAIL_SIZE:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default sizeReducer;
