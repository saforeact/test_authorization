export const SIGN_IN_REQUEST = `${process.env.REACT_APP_SERVER_AUTH}/signIn`;
export const SIGN_UP_REQUEST = `${process.env.REACT_APP_SERVER_AUTH}/signUp`;
export const EDIT_PROFILE_REQUEST = `${process.env.REACT_APP_SERVER_USER}/editProfile`;
export const CHECK_JWT_TOKEN_REQUEST = `${process.env.REACT_APP_SERVER_USER}/data`;
export const POSTS_REQUEST = `${process.env.REACT_APP_SERVER_POST}`;
export const SET_POSTS_REQUEST = `${process.env.REACT_APP_SERVER_POST}/setPost`;

export const EDIT_PROFILE_PATH = "/editProfile";
export const SIGN_IN_PATH = "/signIn";
export const SIGN_UP_PATH = "/signUp";
export const DASHBOARD_PATH = "/dashboard";

export const EDIT_PROFILE_FORM = "editProfile";
export const SIGN_IN_FORM = "signIn";
export const SIGN_UP_FORM = "signUp";
export const SEND_POST_FORM = "sendPost";

export const KEY_IN_LOCALSTORAGE_JWT_TOKEN = "token";

export const NOT_CORRECT_EMAIL = "Not correct email";
export const MAXIMUM_LENGTH = (max) => `Maximum length is ${max} symbols`;
export const MINIMUM_LENGTH = (min) => `Minimum length is ${min} symbols`;
export const REQUIRED = `Required`;
export const NOT_COINCIDE = "Values are not the same";
