import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const update = (data) => axios.put(`${APIEnum.SETTING}`, data);
export const detail = () => axios.get(`${APIEnum.SETTING}`);
