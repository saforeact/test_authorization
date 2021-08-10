import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { SignInForm } from "../../elements/Forms";
import { loginThunk } from "../../Redux/reducers/userReduce";

const useStyle = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
});
const _SignIn = () => {
  const classes = useStyle();

  const dispatch = useDispatch();

  const sendForm = (form) => {
    dispatch(loginThunk(form));
  };
  return (
    <Box className={classes.wrapper}>
      <h1>Sign In</h1>
      <SignInForm onSubmit={sendForm} />
    </Box>
  );
};

export default _SignIn;
