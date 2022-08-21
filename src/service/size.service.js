import axios from '../common/axios';
import { APIEnum } from '../constants/api.endpoint';
import { stringify } from 'query-string';

export const list = (query) =>
	axios.get(`${APIEnum.SIZE}/list/?${stringify(query)}`);
export const create = (data) => axios.post(`${APIEnum.SIZE}/create`, data);
export const update = (id, data) => axios.put(`${APIEnum.SIZE}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.SIZE}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.SIZE}/${id}`);
