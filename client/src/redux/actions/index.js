import { instance } from "../../axios";
import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../actionTypes";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
export const setErrors = (message, url) => ({
  type: SET_ERROR,
  message,
  url,
});
export const setAuth = (flag) => ({
  type: SET_AUTH,
  flag,
});
export const dataClear = () => ({
  type: DATA_CLEAR,
});

export const loginAction = (form) => {
  return async (dispatch) => {
    try {
      const { data, status, config } = await instance().post(`/signIn`, form);

      if (status === 200) {
        const { url } = config;
        const { token } = data;
        localStorage.setItem("token", token);
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
export const registerAction = (form) => {
  return async (dispatch) => {
    try {
      const { data, status, config } = await instance().post(`/signUp`, form);

      if (status === 200) {
        const { token } = data;
        const { url } = config;
        localStorage.setItem("token", token);
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
      const { status, data } = await instance(token).post(`/data`);

      if (status === 200) {
        const { user } = data;
        dispatch(setUser(user));
        dispatch(setAuth(true));
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(setAuth(false));
    }
  };
};
