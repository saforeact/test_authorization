import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MINIMUM_LENGTH,
  NOT_COINCIDE,
  NOT_CORRECT_EMAIL,
  REQUIRED,
} from "../../../../constants";
import { getSingUpFormErrors } from "../../../../redux/selectors";
import { Input } from "../../UI";
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
  const setFormHendler = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    setErrors((prevForm) => ({
      ...prevForm,
      [name]: validateShema(name, value),
    }));
  };
  const errorMessage = useSelector(getSingUpFormErrors);
  const sendFormHendler = () => {
    let isValid = true;
    for (let key in form) {
      const error = validateShema(key, form[key]);
      setErrors((prevForm) => ({
        ...prevForm,
        [key]: error,
      }));
      if (error) {
        isValid = false;
      }
    }
    isValid && onSubmit(form);
  };

  const validateShema = (name, value) => {
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
      onSubmit={sendFormHendler}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Login"
        name="login"
        onChange={setFormHendler}
        value={form.login}
        error={errors.login}
      />
      <Input
        placeholder="Password"
        name="password"
        onChange={setFormHendler}
        value={form.password}
        error={errors.password}
      />
      <Input
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={setFormHendler}
        value={form.confirmPassword}
        error={errors.confirmPassword}
      />
    </EmptyForm>
  );
};
export default SignUpForm;
