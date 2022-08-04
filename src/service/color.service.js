import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.COLOR}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.COLOR, data);
export const update = (id, data) => axios.put(`${APIEnum.COLOR}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.COLOR}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.COLOR}/${id}`);
