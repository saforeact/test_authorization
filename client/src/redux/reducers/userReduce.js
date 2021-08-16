import { DATA_CLEAR, SET_USER } from "../actionTypes";

const initialStore = {};

const userReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload };
    case DATA_CLEAR:
      return action.payload;
    default:
      return { ...state };
  }
};

export default userReduce;
