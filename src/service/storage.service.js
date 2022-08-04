import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.STORAGE}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.STORAGE, data);
export const update = (id, data) => axios.put(`${APIEnum.STORAGE}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.STORAGE}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.STORAGE}/${id}`);
