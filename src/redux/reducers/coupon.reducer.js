import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_COUPON:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_COUPON:
    case types.DELETE_COUPON:
    case types.UPDATE_COUPON:
      return state;
    case types.DETAIL_COUPON:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default couponReducer;
