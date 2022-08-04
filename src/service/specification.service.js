import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.SPECIFICATION}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.SPECIFICATION, data);
export const update = (id, data) =>
  axios.put(`${APIEnum.SPECIFICATION}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.SPECIFICATION}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.SPECIFICATION}/${id}`);
