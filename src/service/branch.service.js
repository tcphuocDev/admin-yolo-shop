import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.BRANCH}?${stringify(query)}`);
export const create = (data) =>
  axios.post(APIEnum.BRANCH, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const update = (id, data) =>
  axios.put(`${APIEnum.BRANCH}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const remove = (id) => axios.delete(`${APIEnum.BRANCH}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.BRANCH}/${id}`);
