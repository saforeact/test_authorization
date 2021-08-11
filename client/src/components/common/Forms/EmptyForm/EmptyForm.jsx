import { FormHelperText } from "@material-ui/core";
import React from "react";
import { SubmitButton } from "../../UI";
import useStyle from "./EmptyFormStyle";

const EmptyForm = ({ children, submitButtonText, onSubmit, errorMessage }) => {
  const classes = useStyle();

  const sendFormHendler = (e) => {
    e.preventDefault();
    onSubmit();
  };

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
