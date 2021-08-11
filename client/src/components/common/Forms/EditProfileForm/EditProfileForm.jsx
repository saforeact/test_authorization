import React, { useEffect, useState } from "react";
import { REQUIRED } from "../../../../constants";
import { DropDown, Input } from "../../UI";
import EmptyForm from "../EmptyForm/EmptyForm";
import { required } from "../validation";

const EditProfileForm = ({ onSubmit = () => {} }) => {
  const fieldNames = {
    name: "name",
    surmane: "surname",
    date: "date",
    sex: "sex",
    photo: "photo",
  };
  const [form, setForm] = useState({
    name: "",
    surname: "",
    date: "",
    sex: "",
    photo: "",
  });
  useEffect(() => {
    console.log(`form`, form);
  }, [form]);
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    date: "",
    sex: "",
    photo: "",
  });
  const errorMessage = "";
  const validateSchema = (name, value) => {
    switch (name) {
      case "name":
        return required(value) && REQUIRED;
      case "date":
        return required(value) && REQUIRED;
      case "sex":
        return required(value) && REQUIRED;

      default:
        return "";
    }
  };
  const optionSex = [
    { text: "Male", value: "Male" },
    { text: "Female", value: "Female" },
  ];
  const setFormHendler = (e) => {
    const { name, value } = e.target;
    console.log(`e`, e);
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
        value={form.data}
        error={errors.data}
      />
      <DropDown
        name={fieldNames.sex}
        option={optionSex}
        onChange={setFormHendler}
      />
    </EmptyForm>
  );
};
export default EditProfileForm;
