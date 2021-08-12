export const getSingInFormErrors = (state) => state.user.error.signIn;
export const getSingUpFormErrors = (state) => state.user.error.signUp;
export const getIsAuth = (state) => state.user.data.isAuth;
export const getIsActive = (state) => state.user.data.user?.isActive;
export const getActiveUser = (state) => state.user.data.user;
