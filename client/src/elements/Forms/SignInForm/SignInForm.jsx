import React, { useState } from "react";
import { Input } from "../../UI";
import EmptyForm from "../EmptyForm/EmptyForm";
import { minLength, required, validateEmail } from "../validation";

const _SignInForm = ({ onSubmit = () => {} }) => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const validateShema = (name, value) => {
    let error = "";
    switch (name) {
      case "login":
        error = required(value) || validateEmail(value);
        break;
      case "password":
        error = required(value) || minLength(value, 6);
        break;
      default:
        break;
    }
    return error;
  };

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

  return (
    <EmptyForm submitButtonText="Login" onSubmit={sendFormHendler}>
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
export default _SignInForm;
