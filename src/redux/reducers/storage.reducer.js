import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const storageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_STORAGE:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_STORAGE:
    case types.DELETE_STORAGE:
    case types.UPDATE_STORAGE:
      return state;
    case types.DETAIL_STORAGE:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default storageReducer;
