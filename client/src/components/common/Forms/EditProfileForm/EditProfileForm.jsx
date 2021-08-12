import React, { useState } from "react";
import { REQUIRED } from "../../../../constants";
import { DropDown, Input } from "../../UI";
import EmptyForm from "../EmptyForm/EmptyForm";
import { required } from "../validation";

const EditProfileForm = ({
  onSubmit = () => {},
  oldForm = {
    name: "",
    surname: "",
    date: "",
    sex: "",
  },
}) => {
  const fieldNames = {
    name: "name",
    surmane: "surname",
    date: "date",
    sex: "sex",
  };
  const [form, setForm] = useState(oldForm);

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    date: "",
    sex: "",
  });
  const errorMessage = "";
  const validateSchema = (name, value) => {
    switch (name) {
      case "name":
        return required(value) && REQUIRED;
      case "surname":
        return required(value) && REQUIRED;
      case "date":
        return required(value) && REQUIRED;
      case "sex":
        return required(value) && REQUIRED;

      default:
        return "";
    }
  };
  const option = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];
  const setFormHendler = (e) => {
    console.log(`e`, e);
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
      submitButtonText="Save"
      onSubmit={sendFormHendler}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Name"
        name={fieldNames.name}
        onChange={setFormHendler}
        value={form.name}
        error={errors.name}
      />
      <Input
        placeholder="Surname"
        name={fieldNames.surmane}
        onChange={setFormHendler}
        value={form.surname}
        error={errors.surname}
      />
      <Input
        name={fieldNames.date}
        type="date"
        onChange={setFormHendler}
        value={form.date}
        error={errors.date}
      />
      <DropDown
        name={fieldNames.sex}
        option={option}
        onChange={setFormHendler}
        value={form.sex}
        error={errors.sex}
      />
    </EmptyForm>
  );
};
export default EditProfileForm;
