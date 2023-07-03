import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_USER:
      return {
        ...state,
        items: action.data,
        meta: action.data.meta,
      };
    case types.UPDATE_USER:
      return state;
    default:
      return state;
  }
};

export default userReducer;
