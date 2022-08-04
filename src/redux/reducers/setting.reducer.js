import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SETTING:
      return state;
    case types.DETAIL_SETTING:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default settingReducer;
