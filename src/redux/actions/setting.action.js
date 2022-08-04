import { notification } from "antd";
import { detail, update } from "../../service/setting.service";
import * as types from "../constants";

export const updateSetting = (data, cb) => {
  return async (dispatch) => {
    try {
      // const form = new FormData();
      // form.append("title", data.title);
      // form.append("description", data.description);
      // form.append("keyword", data.keyword);
      // const keepImages = [];
      // data.images?.fileList?.forEach((e) => {
      //   if (e.originFileObj) form.append("images", e.originFileObj);
      //   else keepImages.push(e.name);
      // });
      // form.append("keepImages", keepImages);

      const response = await update(data);

      if (response.statusCode !== 200) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
export const detailSetting = () => {
  return async (dispatch) => {
    try {
      const response = await detail();
      dispatch({
        type: types.DETAIL_SETTING,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
