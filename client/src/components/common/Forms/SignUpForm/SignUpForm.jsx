import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MINIMUM_LENGTH,
  NOT_COINCIDE,
  NOT_CORRECT_EMAIL,
  REQUIRED,
  SIGN_UP_FORM,
} from "../../../../constants";
import { getFormError } from "../../../../redux/selectors";
import { Input } from "../../UI";
import { sendFormHendler, setFormHendler } from "../commonFunc";
import EmptyForm from "../EmptyForm/EmptyForm";
import { matchUp, minLength, required, validateEmail } from "../validation";

const SignUpForm = ({ onSubmit = () => {} }) => {
  const [form, setForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  });
  const errorMessage = useSelector((state) =>
    getFormError(state, SIGN_UP_FORM)
  );
  const setterForm = (e) =>
    setFormHendler(e, setForm, setErrors, validateSchema);
  const sendForm = () =>
    sendFormHendler(form, setForm, setErrors, onSubmit, validateSchema);
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
      case "confirmPassword":
        return (
          (required(value) && REQUIRED) ||
          (matchUp(value, form.password) && NOT_COINCIDE)
        );
      default:
        return "";
    }
  };
  return (
    <EmptyForm
      submitButtonText="Register"
      onSubmit={sendForm}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Login"
        name="login"
        onChange={setterForm}
        value={form.login}
        error={errors.login}
      />
      <Input
        placeholder="Password"
        name="password"
        onChange={setterForm}
        value={form.password}
        error={errors.password}
      />
      <Input
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={setterForm}
        value={form.confirmPassword}
        error={errors.confirmPassword}
      />
    </EmptyForm>
  );
};
export default SignUpForm;
