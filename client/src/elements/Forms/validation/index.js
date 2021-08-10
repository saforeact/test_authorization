export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? "" : "Not correct email";
};
export const maxLength = (value, max) =>
  value.length <= max ? "" : `Maximum length is ${max} symbols`;

export const minLength = (value, min) =>
  value.length >= min ? "" : `Minimum length is ${min} symbols`;

export const required = (value) => {
  if (!value) {
    return `This is definitely a field`;
  }
};
export const matchUp = (value, value2) =>
  value === value2 ? "" : "Fields do not coincide";
