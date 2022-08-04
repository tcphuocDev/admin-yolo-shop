import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) => axios.get(`${APIEnum.USER}?${stringify(query)}`);
export const update = (id, data) => axios.put(`${APIEnum.USER}/${id}`, data);
