import { ERROR_CLEAR, SET_ERROR } from "../actionTypes";

const initialStore = {};

const formsErrorReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, ...action.error };
    case ERROR_CLEAR:
      return {};

    default:
      return { ...state };
  }
};

export default formsErrorReduce;
