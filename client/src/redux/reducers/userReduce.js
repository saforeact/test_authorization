import { DATA_CLEAR, SET_IS_ACTIVE, SET_USER } from "../actionTypes";

const initialStore = {};

const userReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, data: { ...action.payload } };
    case SET_IS_ACTIVE:
      return { ...state, isActive: action.payload };
    case DATA_CLEAR:
      return {};
    default:
      return { ...state };
  }
};

export default userReduce;
