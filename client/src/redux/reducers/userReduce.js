import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../actionTypes";

const initialStore = {
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

export default userReduce;
