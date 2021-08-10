import React, { useState } from "react";
import { Input } from "../../UI";
import EmptyForm from "../EmptyForm/EmptyForm";
import { matchUp, minLength, required, validateEmail } from "../validation";

const _SignUpForm = ({ onSubmit = () => {} }) => {
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
    let error = "";
    switch (name) {
      case "login":
        error = required(value) || validateEmail(value);
        break;
      case "password":
        error = required(value) || minLength(value, 6);
        break;
      case "confirmPassword":
        error = required(value) || matchUp(value, form.password);
        break;
      default:
        break;
    }
    return error;
  };
  return (
    <EmptyForm submitButtonText="Register" onSubmit={sendFormHendler}>
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
export default _SignUpForm;