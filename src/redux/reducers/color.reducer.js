import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_COLOR:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_COLOR:
    case types.DELETE_COLOR:
    case types.UPDATE_COLOR:
      return state;
    case types.DETAIL_COLOR:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default colorReducer;
