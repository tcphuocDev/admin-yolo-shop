import { notification } from "antd";
import {
  create,
  detail,
  list,
  remove,
  update,
} from "../../service/product.service";
import * as types from "../constants";

export const listProduct = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_PRODUCT,
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

export const createProduct = (data, cb) => {
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);
      form.append("tag", data.tag);
      form.append("price", data.price);
      form.append("salePrice", data.salePrice);
      form.append("categoryId", data.categoryId);
      form.append("subCategoryId", data.subCategoryId);
      form.append("productVersions", JSON.stringify(data.productVersions));
      const keepImages = [];
      data.images.fileList.forEach((e) => {
        if (e.originFileObj) form.append("images", e.originFileObj);
        else keepImages.push(e.name);
      });
      form.append("keepImages", keepImages);
      console.log("form", form);
      const response = await create(form);

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

export const updateProduct = (id, data, cb) => {
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);
      form.append("tag", data.tag);
      form.append("price", data.price);
      form.append("salePrice", data.salePrice);
      form.append("categoryId", data.categoryId);
      form.append("subCategoryId", data.subCategoryId);
      form.append("productVersions", JSON.stringify(data.productVersions));
      const keepImages = [];
      data.images?.fileList?.forEach((e) => {
        if (e.originFileObj) {
          form.append("images", e.originFileObj);
        } else {
          keepImages.push(e.name);
        }
      });
      form.append("keepImages", keepImages);

      const response = await update(id, form);

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

export const deleteProduct = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await remove(id);

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

export const detailProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_PRODUCT,
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

export const listProductSell = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_PRODUCT_SELL,
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
