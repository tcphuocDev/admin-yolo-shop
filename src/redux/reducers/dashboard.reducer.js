import * as types from "../constants";

const initialState = {
  summary: {},
  orders: [],
  customers: [],
  orderMoneys: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_SUMMARY:
      return {
        ...state,
        summary: action.data,
      };
    case types.DASHBOARD_ORDER:
      return {
        ...state,
        orders: action.data.items,
      };
    case types.DASHBOARD_CUSTOMER:
      return {
        ...state,
        customers: action.data.users,
      };

    case types.DASHBOARD_ORDER_MONEY:
      return {
        ...state,
        orderMoneys: action.data.items,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
