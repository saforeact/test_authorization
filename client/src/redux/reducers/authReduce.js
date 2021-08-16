import { SET_AUTH } from "../actionTypes";

const initialStore = {};

const authReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default authReduce;
