import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/actions";
import { SignInForm } from "../common/Forms";
import useStyle from "./SignInStyle";

const SignIn = () => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const sendForm = (form) => {
    dispatch(loginAction(form));
  };
  return (
    <Box className={classes.wrapper}>
      <h1>Sign In</h1>
      <SignInForm onSubmit={sendForm} />
    </Box>
  );
};

export default SignIn;
