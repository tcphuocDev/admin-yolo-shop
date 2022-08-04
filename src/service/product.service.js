import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.PRODUCT}?${stringify(query)}`);
export const create = (data) =>
  axios.post(APIEnum.PRODUCT, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const update = (id, data) =>
  axios.put(`${APIEnum.PRODUCT}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const remove = (id) => axios.delete(`${APIEnum.PRODUCT}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.PRODUCT}/${id}`);
