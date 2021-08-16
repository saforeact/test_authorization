import { instance } from "../../axios";
import {
  CHECK_JWT_TOKEN_REQUEST,
  EDIT_PROFILE_FORM,
  EDIT_PROFILE_REQUEST,
  KEY_IN_LOCALSTORAGE_JWT_TOKEN,
  POSTS_REQUEST,
  SEND_POST_FORM,
  SET_POSTS_REQUEST,
  SIGN_IN_FORM,
  SIGN_IN_REQUEST,
  SIGN_UP_FORM,
  SIGN_UP_REQUEST,
} from "../../constants";
import {
  ADD_POST,
  DATA_CLEAR,
  ERROR_CLEAR,
  SET_AUTH,
  SET_ERROR,
  SET_LOADING_POST,
  SET_META,
  SET_POST,
  SET_USER,
  UPDATE_POST,
} from "../actionTypes";

export const setLoadingPost = (payload) => {
  return {
    type: SET_LOADING_POST,
    payload: { loading: payload },
  };
};
export const setPosts = (payload) => {
  return {
    type: SET_POST,
    payload,
  };
};
export const updatePosts = (payload) => {
  return {
    type: UPDATE_POST,
    payload,
  };
};
export const addPosts = (payload) => {
  return {
    type: ADD_POST,
    payload,
  };
};
export const setMeta = (payload) => {
  return {
    type: SET_META,
    payload,
  };
};

export const setUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};
export const setErrors = (formName, message) => {
  return {
    type: SET_ERROR,
    error: { [formName]: message },
  };
};

export const setAuth = (flag) => {
  return {
    type: SET_AUTH,
    payload: { isAuth: flag },
  };
};
export const errorClear = () => {
  return {
    type: ERROR_CLEAR,
  };
};
export const dataClear = () => {
  return {
    type: DATA_CLEAR,
    payload: {},
  };
};
export const checkToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
    if (!token) {
      dispatch(setAuth(false));
      return;
    }
    return token;
  };
};
export const loginAction = (form) => {
  return async (dispatch) => {
    try {
      const { data } = await instance().post(SIGN_IN_REQUEST, form);
      const { token } = data;
      localStorage.setItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN, token);
      dispatch(dataAction());
      dispatch(errorClear());
    } catch (error) {
      const { data } = error.response;
      const { message } = data;

      dispatch(setErrors(SIGN_IN_FORM, message));
    }
  };
};

export const registerAction = (form) => {
  return async (dispatch) => {
    try {
      const { data, status } = await instance().post(SIGN_UP_REQUEST, form);
      if (status === 200) {
        const { token } = data;
        localStorage.setItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN, token);
        dispatch(dataAction());
        dispatch(errorClear());
      }
    } catch (error) {
      const { data } = error.response;
      const { message } = data;
      dispatch(setErrors(SIGN_UP_FORM, message));
    }
  };
};

export const editProfileAction = (form) => {
  return async (dispatch) => {
    try {
      const token = await dispatch(checkToken());
      if (token) {
        await instance(token).post(EDIT_PROFILE_REQUEST, { form });
        dispatch(setAuth(true));
        dispatch(dataAction());
        dispatch(errorClear());
      }
    } catch (error) {
      const { data } = error.response;
      const { message } = data;
      localStorage.removeItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
      dispatch(setAuth(false));
      dispatch(setErrors(EDIT_PROFILE_FORM, message));
    }
  };
};
export const dataAction = () => {
  return async (dispatch) => {
    const token = await dispatch(checkToken());
    if (token) {
      try {
        const { data } = await instance(token).post(CHECK_JWT_TOKEN_REQUEST);

        const { user } = data;
        dispatch(setUser(user));
        dispatch(getPostsAction({ page: 0 }));
        dispatch(setAuth(true));
      } catch (error) {
        localStorage.removeItem(KEY_IN_LOCALSTORAGE_JWT_TOKEN);
        dispatch(setAuth(false));
      }
    }
  };
};
export const getPostsAction = ({ page }) => {
  return async (dispatch) => {
    const token = await dispatch(checkToken());
    if (token) {
      try {
        dispatch(setLoadingPost(true));
        const { data } = await instance(token).post(POSTS_REQUEST, {
          limit: 10,
          page: page,
        });
        const { postList, listInformation } = data;
        dispatch(setMeta(listInformation));
        dispatch(setPosts(postList));
        dispatch(errorClear());
      } catch (error) {
      } finally {
        dispatch(setLoadingPost(false));
      }
    }
  };
};

export const sendPostAction = (form) => {
  return async (dispatch) => {
    const token = await dispatch(checkToken());
    if (token) {
      try {
        const { data } = await instance(token).post(SET_POSTS_REQUEST, form);
        const { post } = data;

        dispatch(addPosts(post));
        dispatch(errorClear());
      } catch (error) {
        const { data } = error.response;
        const { message } = data;
        dispatch(setErrors(SEND_POST_FORM, message));
      }
    }
  };
};
