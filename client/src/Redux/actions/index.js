import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../constantsAction";

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
