import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ORDER:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CHANGE_STATUS_ORDER:
      return state;
    case types.DETAIL_ORDER:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default orderReducer;
