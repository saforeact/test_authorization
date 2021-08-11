import { DATA_CLEAR, SET_AUTH, SET_ERROR, SET_USER } from "../actionTypes";

const initialStore = {
  data: {},
  error: {},
};

const userReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, data: { ...state.data, ...action.payload } };
    case SET_ERROR:
      return {
        ...state,
        error: { ...state.error, ...action.error },
      };
    case SET_AUTH:
      return { ...state, data: { ...state.data, ...action.payload } };
    case DATA_CLEAR:
      return action.payload;
    default:
      return { ...state };
  }
};

export default userReduce;
