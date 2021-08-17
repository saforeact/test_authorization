import { FormHelperText } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { SubmitButton } from "../../UI";
import useStyle from "./EmptyFormStyle";

const EmptyForm = ({
  children,
  submitButtonText,
  onSubmit,
  errorMessage,
  className = {},
  ...props
}) => {
  const classes = useStyle();

  const sendFormHendler = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      className={classNames(classes.form, className)}
      onSubmit={sendFormHendler}
    >
      {children}
      <SubmitButton>{submitButtonText}</SubmitButton>
      <FormHelperText error={!!errorMessage} className={classes.messageError}>
        {errorMessage}
      </FormHelperText>
    </form>
  );
};

export default EmptyForm;
