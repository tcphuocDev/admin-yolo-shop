import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const loginService = (data) => axios.post(APIEnum.LOGIN, data);
export const registerService = (data) => axios.post(APIEnum.REGISTER, data);
export const getProfileService = () => axios.get(APIEnum.PROFILE);
export const getTokenService = (data) => axios.post(APIEnum.GET_TOKEN, data);
