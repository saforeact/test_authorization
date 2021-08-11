import { instance } from "../../axios";
import {
  CHECK_JWT_TOKEN_REQUEST,
  KEY_IN_LOCALSTORAGE_JWT_TOKEN,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
} from "../../constants";
import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../actionTypes";

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload: { user: payload },
  };
};
export const setErrors = (message, url) => {
  const nameForm = url.split("/")[1];
  return {
    type: SET_ERROR,
    error: { [nameForm]: message },
  };
};

export const setAuth = (flag) => {
  return {
    type: SET_AUTH,
    payload: { isAuth: flag },
  };
};
export const dataClear = () => {
  return {
    type: DATA_CLEAR,
    payload: {
      data: { isAuth: false },
      error: {},
    },
  };
};

export const loginAction = (form) => {
  return async (dispatch) => {
    try {
      const { data, config } = await instance().post(SIGN_IN_REQUEST, form);
      const { url } = config;
      const { token } = data;
      localStorage.setItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN, token);
      dispatch(dataAction(token));
      dispatch(setErrors("", url));
    } catch (error) {
      const { config, data } = error.response;
      const { message } = data;
      const { url } = config;
      dispatch(setErrors(message, url));
    }
  };
};
export const registerAction = (form) => {
  return async (dispatch) => {
    try {
      const { data, status, config } = await instance().post(
        SIGN_UP_REQUEST,
        form
      );

      if (status === 200) {
        const { token } = data;
        const { url } = config;
        localStorage.setItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN, token);
        dispatch(dataAction(token));
        dispatch(setErrors("", url));
      }
    } catch (error) {
      const { config, data } = error.response;
      const { message } = data;
      const { url } = config;
      dispatch(setErrors(message, url));
    }
  };
};
export const dataAction = (token) => {
  return async (dispatch) => {
    try {
      if (!token) {
        dispatch(setAuth(false));
        return;
      }
      const { status, data } = await instance(token).post(
        CHECK_JWT_TOKEN_REQUEST
      );

      if (status === 200) {
        const { user } = data;
        dispatch(setUser(user));
        dispatch(setAuth(true));
      }
    } catch (error) {
      localStorage.removeItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
      dispatch(setAuth(false));
    }
  };
};
