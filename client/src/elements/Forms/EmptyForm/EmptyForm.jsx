import { FormHelperText } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SubmitButton } from "../../UI";
import useStyle from "./EmptyFormStyle";

const EmptyForm = ({ children, submitButtonText, onSubmit }) => {
  const classes = useStyle();
  const location = useLocation();
  const { pathname } = location;
  const formName = pathname.split("/")[1];

  const sendFormHendler = (e) => {
    e.preventDefault();
    onSubmit();
  };
  const errorMessage = useSelector((state) => state.user.error[formName]);

  return (
    <form className={classes.form} onSubmit={sendFormHendler}>
      {children}
      <SubmitButton>{submitButtonText}</SubmitButton>
      <FormHelperText error={!!errorMessage} className={classes.messageError}>
        {errorMessage}
      </FormHelperText>
    </form>
  );
};

export default EmptyForm;
