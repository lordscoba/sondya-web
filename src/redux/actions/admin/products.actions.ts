import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_GETBYID_PRODUCT_FAIL,
  ADMIN_GETBYID_PRODUCT_REQUEST,
  ADMIN_GETBYID_PRODUCT_SUCCESS,
  ADMIN_GET_ALL_PRODUCT_FAIL,
  ADMIN_GET_ALL_PRODUCT_REQUEST,
  ADMIN_GET_ALL_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
} from "../../constants/admin/products.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import { ReduxResponseType } from "../../types/general.types";
import {
  AdminCreateProduct,
  AdminUpdateProduct,
} from "../../types/products.types";

export const adminCreateProductAction =
  ({
    name,
    category,
    owner,
    description,
    total_stock,
    tag,
    brand,
    model,
    current_price,
    product_status,

    old_price,
    discount_percentage,
    vat_percentage,
    total_variants,
    variants,
    image,

    country,
    state,
    city,
    address,
    zip_code,
  }: AdminCreateProduct) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_CREATE_PRODUCT_REQUEST,
      });

      // load data for flight
      let FD: FormData = new FormData();
      FD.append("name", name);
      FD.append("category", category);
      owner && FD.append("owner", JSON.stringify(owner));
      FD.append("description", description);
      FD.append("total_stock", total_stock.toString()); //
      FD.append("tag", tag);
      FD.append("brand", brand);
      FD.append("model", model);
      FD.append("current_price", current_price.toString());
      FD.append("product_status", product_status);
      FD.append("old_price", old_price.toString());
      FD.append("discount_percentage", discount_percentage.toString());
      FD.append("vat_percentage", vat_percentage.toString());
      FD.append("total_variants", total_variants.toString());
      FD.append("variants", JSON.stringify(variants));

      // location
      FD.append("country", country);
      FD.append("state", state);
      FD.append("city", city);
      FD.append("address", address);
      FD.append("zip_code", zip_code);

      // get state
      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      if (image && Array.isArray(image) && image.length >= 1) {
        image.forEach((file) => FD.append("image", file as File));
      }

      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.adminProducts?.create,
        FD,
        config
      );
      dispatch({
        type: ADMIN_CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminUpdateProductAction =
  (
    {
      name,
      category,
      description,
      total_stock,
      tag,
      brand,
      model,
      current_price,
      product_status,

      old_price,
      discount_percentage,
      vat_percentage,
      total_variants,
      variants,
      image,

      id,

      country,
      state,
      city,
      address,
      zip_code,
    }: AdminUpdateProduct,
    deleteImageId: string[]
  ) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_REQUEST,
      });

      const state1 = getState();
      const login: ReduxResponseType<LoginResponseType> = state1?.login;

      // load data for flight
      let FD: FormData = new FormData();
      FD.append("name", name);
      FD.append("category", category);

      FD.append("description", description);
      total_stock && FD.append("total_stock", total_stock.toString()); //
      FD.append("tag", tag);
      FD.append("brand", brand);
      FD.append("model", model);
      current_price && FD.append("current_price", current_price.toString());
      FD.append("product_status", product_status);
      old_price && FD.append("old_price", old_price.toString());
      discount_percentage &&
        FD.append("discount_percentage", discount_percentage.toString());
      vat_percentage && FD.append("vat_percentage", vat_percentage.toString());
      total_variants && FD.append("total_variants", total_variants.toString());
      variants && FD.append("variants", JSON.stringify(variants));

      // location
      FD.append("country", country);
      FD.append("state", state);
      FD.append("city", city);
      FD.append("address", address);
      FD.append("zip_code", zip_code);

      FD.append("deleteImageId", JSON.stringify(deleteImageId));
      if (image && Array.isArray(image) && image.length >= 1) {
        image.forEach((file) => FD.append("image", file as File));
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.adminProducts?.update + id,
        FD,
        config
      );
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_UPDATE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteProductAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.delete(
        API_ROUTES?.adminProducts?.delete + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetProductByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GETBYID_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.adminProducts?.getByID + id,
        config
      );
      dispatch({
        type: ADMIN_GETBYID_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GETBYID_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetProductsAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_PRODUCT_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.get(
        API_ROUTES?.adminProducts?.getAll + "?" + query.toString(),
        config
      );

      // console.log(data);

      dispatch({
        type: ADMIN_GET_ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // console.log(error);
      dispatch({
        type: ADMIN_GET_ALL_PRODUCT_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
