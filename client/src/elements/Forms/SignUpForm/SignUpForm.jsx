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
    switch (name) {
      case "login":
        return required(value) || validateEmail(value);

      case "password":
        return required(value) || minLength(value, 6);

      case "confirmPassword":
        return required(value) || matchUp(value, form.password);

      default:
        return "";
    }
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
