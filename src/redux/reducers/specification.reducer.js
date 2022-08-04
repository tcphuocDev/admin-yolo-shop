import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const specificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_SPECIFICATION:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_SPECIFICATION:
    case types.DELETE_SPECIFICATION:
    case types.UPDATE_SPECIFICATION:
      return state;
    case types.DETAIL_SPECIFICATION:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default specificationReducer;
