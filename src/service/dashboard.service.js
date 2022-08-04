import { stringify } from "query-string";
import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const summaryService = () => axios.get(`${APIEnum.DASHBOARD}/summary`);
export const orderStatusService = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/order-status?${stringify(params)}`);
export const customerService = () => axios.get(`${APIEnum.DASHBOARD}/customer`);
export const orderMoneyService = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/dashboard-money?${stringify(params)}`);
