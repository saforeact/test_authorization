import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/actions";
import { SignUpForm } from "../common/Forms";
import useStyles from "./SignUpStyle";

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sendRegisterForm = (form) => {
    dispatch(registerAction({ login: form.login, password: form.password }));
  };
  return (
    <Box className={classes.wrapper}>
      <h1>Sign Up</h1>
      <SignUpForm onSubmit={sendRegisterForm} />
    </Box>
  );
};

export default SignUp;
