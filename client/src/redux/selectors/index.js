export const getFormError = (state, name) => state.errors[name];
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsActive = (state) => state.user.isActive;
export const getActiveUser = (state) => state.user.data;
export const getAllPosts = (state) => state.posts.posts;
export const getMetaPosts = (state) => state.posts.meta;
