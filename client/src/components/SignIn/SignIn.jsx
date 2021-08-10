import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { SignInForm } from "../../elements/Forms";
import { loginAction } from "../../redux/actions";

const useStyle = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
});
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
