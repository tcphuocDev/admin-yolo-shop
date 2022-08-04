import { notification } from "antd";
import {
  summaryService,
  customerService,
  orderStatusService,
  orderMoneyService,
} from "../../service/dashboard.service";
import * as types from "../constants";

export const dashboardSummary = () => {
  return async (dispatch) => {
    try {
      const response = await summaryService();
      dispatch({
        type: types.DASHBOARD_SUMMARY,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardCustomer = () => {
  return async (dispatch) => {
    try {
      const response = await customerService();
      dispatch({
        type: types.DASHBOARD_CUSTOMER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardOrder = (params) => {
  return async (dispatch) => {
    try {
      const response = await orderStatusService(params);
      dispatch({
        type: types.DASHBOARD_ORDER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardOrderMoney = (params) => {
  return async (dispatch) => {
    try {
      const response = await orderMoneyService(params);
      dispatch({
        type: types.DASHBOARD_ORDER_MONEY,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
