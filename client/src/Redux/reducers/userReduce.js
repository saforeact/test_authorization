import { instance } from "../../axios";
import { setAuth, setErrors, setUser } from "../actions";
import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../constantsAction";

const initialStore = {
  loading: false,
  loaded: false,
  data: {},
  error: {},
};

const userReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, data: { ...state.data, user: action.payload } };
    case SET_ERROR:
      const { url, message } = action;
      const nameForm = url.split("/")[1];
      return { ...state, error: { ...state.error, [nameForm]: message } };
    case SET_AUTH:
      return { ...state, data: { ...state.data, isAuth: action.flag } };
    case DATA_CLEAR:
      return {
        loading: false,
        loaded: false,
        data: { isAuth: false },
        error: {},
      };
    default:
      return { ...state };
  }
};

export const loginThunk = (form) => {
  return async (dispatch) => {
    try {
      const { data, status, config } = await instance().post(`/signIn`, form);

      if (status === 200) {
        const { url, user } = config;
        const { token } = data;
        localStorage.setItem("token", token);
        dispatch(setUser(user));
        dispatch(setAuth(true));
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
export const registerThunk = (form) => {
  return async (dispatch) => {
    try {
      const { data, status, config } = await instance().post(`/signUp`, form);

      if (status === 200) {
        const { token, user } = data;
        const { url } = config;
        localStorage.setItem("token", token);
        dispatch(setUser(user));
        dispatch(setAuth(true));
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
export const dataThunk = (token) => {
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

export default userReduce;
