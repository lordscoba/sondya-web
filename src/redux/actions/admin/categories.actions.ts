import axios from "axios";
import { Dispatch } from "redux";
import {
  ADMIN_CREATE_CATEGORY_FAIL,
  ADMIN_CREATE_CATEGORY_REQUEST,
  ADMIN_CREATE_CATEGORY_SUCCESS,
  ADMIN_DELETE_CATEGORY_FAIL,
  ADMIN_DELETE_CATEGORY_REQUEST,
  ADMIN_DELETE_CATEGORY_SUCCESS,
  ADMIN_GETBYID_CATEGORY_FAIL,
  ADMIN_GETBYID_CATEGORY_REQUEST,
  ADMIN_GETBYID_CATEGORY_SUCCESS,
  ADMIN_GET_ALL_CATEGORY_FAIL,
  ADMIN_GET_ALL_CATEGORY_REQUEST,
  ADMIN_GET_ALL_CATEGORY_SUCCESS,
  ADMIN_GET_PRODUCTS_CATEGORY_FAIL,
  ADMIN_GET_PRODUCTS_CATEGORY_REQUEST,
  ADMIN_GET_PRODUCTS_CATEGORY_SUCCESS,
  ADMIN_GET_SERVICES_CATEGORY_FAIL,
  ADMIN_GET_SERVICES_CATEGORY_REQUEST,
  ADMIN_GET_SERVICES_CATEGORY_SUCCESS,
  ADMIN_UPDATE_CATEGORY_FAIL,
  ADMIN_UPDATE_CATEGORY_REQUEST,
  ADMIN_UPDATE_CATEGORY_SUCCESS,
} from "../../constants/admin/categories.constants";
import { API_ROUTES } from "../../routes";
import { LoginResponseType } from "../../types/auth.types";
import {
  AdminCreateCategory,
  AdminUpdateCategory,
} from "../../types/categories.types";
import { ReduxResponseType } from "../../types/general.types";

export const adminCreateCategoryAction =
  ({ name, description, category, image }: AdminCreateCategory) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_CREATE_CATEGORY_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      let FD: FormData = new FormData();
      FD.append("name", name);
      FD.append("description", description);
      FD.append("category", category);
      if (image) {
        FD.append("image", image);
      }

      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.post(
        API_ROUTES?.adminCategories?.create,
        // { name, description,category, image },
        FD,
        config
      );
      dispatch({
        type: ADMIN_CREATE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_CREATE_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminUpdateCategoryAction =
  ({ name, description, category, image, id }: AdminUpdateCategory) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_CATEGORY_REQUEST,
      });

      const state = getState();
      const login: ReduxResponseType<LoginResponseType> = state?.login;

      let FD: FormData = new FormData();
      FD.append("name", name);
      FD.append("description", description);
      FD.append("category", category);
      if (image && !Array.isArray(image)) {
        FD.append("image", image);
      }

      const config = {
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${login?.serverResponse?.data?.token}`,
        },
      };

      const { data } = await axios.put(
        API_ROUTES?.adminCategories?.update + id,
        FD,
        config
      );
      dispatch({
        type: ADMIN_UPDATE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_UPDATE_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminDeleteCategoryAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_DELETE_CATEGORY_REQUEST,
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
        API_ROUTES?.adminCategories?.delete + id,
        config
      );
      dispatch({
        type: ADMIN_DELETE_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_DELETE_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetCategoryByIdAction =
  ({ id }: any) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GETBYID_CATEGORY_REQUEST,
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
        API_ROUTES?.adminCategories?.getByID + id,
        config
      );
      dispatch({
        type: ADMIN_GETBYID_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GETBYID_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetCategoriesAction =
  (query: string) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_ALL_CATEGORY_REQUEST,
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
        API_ROUTES?.adminCategories?.getAll + "?" + query.toString(),
        config
      );
      dispatch({
        type: ADMIN_GET_ALL_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_ALL_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetServiceCategoriesAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_SERVICES_CATEGORY_REQUEST,
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
        API_ROUTES?.adminCategories?.getServices,
        config
      );
      dispatch({
        type: ADMIN_GET_SERVICES_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_SERVICES_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const adminGetProductCategoriesAction =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: ADMIN_GET_PRODUCTS_CATEGORY_REQUEST,
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
        API_ROUTES?.adminCategories?.getProducts,
        config
      );
      dispatch({
        type: ADMIN_GET_PRODUCTS_CATEGORY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ADMIN_GET_PRODUCTS_CATEGORY_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
