import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MINIMUM_LENGTH,
  NOT_CORRECT_EMAIL,
  REQUIRED,
  SIGN_IN_FORM,
} from "../../../../constants";
import { getFormError } from "../../../../redux/selectors";
import { Input } from "../../UI";
import { sendFormHendler, setFormHendler } from "../commonFunc";
import EmptyForm from "../EmptyForm/EmptyForm";
import { minLength, required, validateEmail } from "../validation";

const SignInForm = ({ onSubmit = () => {} }) => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });
  const errorMessage = useSelector((state) =>
    getFormError(state, SIGN_IN_FORM)
  );
  const validateSchema = (name, value) => {
    switch (name) {
      case "login":
        return (
          (required(value) && REQUIRED) ||
          (validateEmail(value) && NOT_CORRECT_EMAIL)
        );
      case "password":
        return (
          (required(value) && REQUIRED) ||
          (minLength(value, 6) && MINIMUM_LENGTH(6))
        );
      default:
        return "";
    }
  };

  const setterForm = (e) =>
    setFormHendler(e, setForm, setErrors, validateSchema);
  const sendForm = () =>
    sendFormHendler(form, setForm, setErrors, onSubmit, validateSchema);

  return (
    <EmptyForm
      submitButtonText="Login"
      onSubmit={sendForm}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Login"
        name="login"
        onChange={setterForm}
        value={form.login}
        error={errors["login"]}
      />
      <Input
        placeholder="Password"
        name="password"
        onChange={setterForm}
        value={form.password}
        error={errors["password"]}
      />
    </EmptyForm>
  );
};
export default SignInForm;
