import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { SignUpForm } from "../../elements/Forms";
import { registerAction } from "../../redux/actions";

const useStyle = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
const SignUp = () => {
  const classes = useStyle();
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
