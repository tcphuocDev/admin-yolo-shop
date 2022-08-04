import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_BRANCH:
      return {
        ...state,
        items: action.branch.items,
        meta: action.branch.meta,
      };
    case types.CREATE_BRANCH:
    case types.DELETE_BRANCH:
    case types.UPDATE_BRANCH:
      return state;
    case types.DETAIL_BRANCH:
      return {
        ...state,
        item: action.branch,
      };
    default:
      return state;
  }
};

export default branchReducer;
