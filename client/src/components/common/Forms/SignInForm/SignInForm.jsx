import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MINIMUM_LENGTH,
  NOT_CORRECT_EMAIL,
  REQUIRED,
} from "../../../../constants";
import { getSingInFormErrors } from "../../../../redux/selectors";
import { Input } from "../../UI";
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
  const errorMessage = useSelector(getSingInFormErrors);
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

  const setFormHendler = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));

    setErrors((prevForm) => ({
      ...prevForm,
      [name]: validateSchema(name, value),
    }));
  };

  const sendFormHendler = () => {
    let isValid = true;
    for (let key in form) {
      const error = validateSchema(key, form[key]);
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

  return (
    <EmptyForm
      submitButtonText="Login"
      onSubmit={sendFormHendler}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Login"
        name="login"
        onChange={setFormHendler}
        value={form.login}
        error={errors["login"]}
      />
      <Input
        placeholder="Password"
        name="password"
        onChange={setFormHendler}
        value={form.password}
        error={errors["password"]}
      />
    </EmptyForm>
  );
};
export default SignInForm;
