import {
  ADD_POST,
  DATA_CLEAR,
  SET_LOADING_POST,
  SET_META,
  SET_POST,
  UPDATE_POST,
} from "../actionTypes";

const initialStore = {
  posts: [],
  meta: {
    loading: false,
  },
};

const postsReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_POST:
      return { ...state, posts: [...state.posts, ...action.payload] };
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state] };
    case UPDATE_POST:
      return { ...state, posts: [...action.payload] };
    case SET_META:
      return { ...state, meta: { ...action.payload } };
    case SET_LOADING_POST:
      return { ...state, meta: { ...state.meta, ...action.payload } };
    case DATA_CLEAR:
      return {};
    default:
      return { ...state };
  }
};

export default postsReduce;
