import React, { useState } from "react";
import { useSelector } from "react-redux";
import { REQUIRED, SEND_POST_FORM } from "../../../../constants";
import { getFormError } from "../../../../redux/selectors";
import { Input } from "../../UI";
import { sendFormHendler, setFormHendler } from "../commonFunc";
import EmptyForm from "../EmptyForm/EmptyForm";
import { required } from "../validation";
import useStyles from "./SendPostFormStyle";
const SendPostForm = ({ onSubmit = () => {} }) => {
  const classes = useStyles();
  const fieldsName = {
    title: "title",
    body: "body",
  };
  const [form, setForm] = React.useState({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    body: "",
  });

  const validateSchema = (name, value) => {
    switch (name) {
      case "title":
        return required(value) && REQUIRED;
      case "body":
        return required(value) && REQUIRED;
      default:
        return "";
    }
  };
  const errorMessage = useSelector((state) =>
    getFormError(state, SEND_POST_FORM)
  );
  const setterForm = (e) =>
    setFormHendler(e, setForm, setErrors, validateSchema);
  const sendForm = () =>
    sendFormHendler(form, setForm, setErrors, onSubmit, validateSchema);
  return (
    <EmptyForm
      submitButtonText="Send"
      onSubmit={sendForm}
      errorMessage={errorMessage}
      className={classes.wrapper}
    >
      <Input
        name={fieldsName.title}
        variant="outlined"
        placeholder="Title"
        value={form.title}
        onChange={setterForm}
        error={errors.title}
      />
      <Input
        name={fieldsName.body}
        variant="outlined"
        placeholder="What's new?"
        value={form.body}
        onChange={setterForm}
        error={errors.body}
      />
    </EmptyForm>
  );
};
export default SendPostForm;
