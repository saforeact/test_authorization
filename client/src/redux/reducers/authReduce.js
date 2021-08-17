import { DATA_CLEAR, SET_AUTH } from "../actionTypes";

const initialStore = {};

const authReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...action.payload,
      };
    case DATA_CLEAR:
      return { isAuth: false };
    default:
      return { ...state };
  }
};

export default authReduce;
