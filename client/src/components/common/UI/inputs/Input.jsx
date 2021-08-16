import { TextField } from "@material-ui/core";
import React from "react";

const Input = ({ error, ...props }) => {
  return <TextField {...props} error={!!error} helperText={error} />;
};

export default Input;
