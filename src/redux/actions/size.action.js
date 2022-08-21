import { notification } from 'antd';
import {
	create,
	detail,
	list,
	remove,
	update,
} from '../../service/size.service';
import * as types from '../constants';

export const listSize = (query) => {
	return async (dispatch) => {
		try {
			const response = await list(query);
			dispatch({
				type: types.LIST_SIZE,
				data: response.data,
			});
		} catch (error) {
			console.log(error?.message || error);
			notification.open({
				message: 'Thất bại',
				description: error?.message || error,
			});
		}
	};
};

export const createSize = (data, cb) => {
	return async (dispatch) => {
		try {
			const response = await create(data);

			if (response.statusCode !== 200) {
				notification.open({
					message: 'Thất bại',
					description: response.message,
				});
			} else {
				notification.open({
					message: 'Thành công',
					description: response.message,
				});
				cb();
			}
		} catch (error) {
			console.log(error?.message || error);
			notification.open({
				message: 'Thất bại',
				description: error?.message || error,
			});
		}
	};
};

export const updateSize = (id, data, cb) => {
	return async (dispatch) => {
		try {
			const response = await update(id, data);

			if (response.statusCode !== 200) {
				notification.open({
					message: 'Thất bại',
					description: response.message,
				});
			} else {
				notification.open({
					message: 'Thành công',
					description: response.message,
				});
				cb();
			}
		} catch (error) {
			console.log(error?.message || error);
			notification.open({
				message: 'Thất bại',
				description: error?.message || error,
			});
		}
	};
};

export const deleteSize = (id, cb) => {
	return async (dispatch) => {
		try {
			const response = await remove(id);

			if (response.statusCode !== 200) {
				notification.open({
					message: 'Thất bại',
					description: response.message,
				});
			} else {
				notification.success({
					message: 'Thành công',
					description: response.message,
				});
				cb();
			}
		} catch (error) {
			console.log(error?.message || error);
			notification.open({
				message: 'Thất bại',
				description: error?.message || error,
			});
		}
	};
};

export const detailSize = (id) => {
	return async (dispatch) => {
		try {
			const response = await detail(id);
			dispatch({
				type: types.DETAIL_SIZE,
				data: response.data,
			});
		} catch (error) {
			console.log(error?.message || error);
			notification.open({
				message: 'Thất bại',
				description: error?.message || error,
			});
		}
	};
};
