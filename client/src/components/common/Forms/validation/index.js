export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(email).toLowerCase());
};
export const maxLength = (value, max) => value.length > max;

export const minLength = (value, min) => value.length < min;

export const required = (value) => !value.length;

export const matchUp = (value, value2) => value !== value2;
