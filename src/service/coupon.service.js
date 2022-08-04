import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.COUPON}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.COUPON, data);
export const update = (id, data) => axios.put(`${APIEnum.COUPON}/${id}`, data);
export const confirm = (id) => axios.put(`${APIEnum.COUPON}/${id}/confirm`);
export const remove = (id) => axios.delete(`${APIEnum.COUPON}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.COUPON}/${id}`);
