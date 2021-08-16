import React, { useState } from "react";
import { useSelector } from "react-redux";
import { EDIT_PROFILE_FORM, REQUIRED } from "../../../../constants";
import { getFormError } from "../../../../redux/selectors";
import { DropDown, Input } from "../../UI";
import { sendFormHendler, setFormHendler } from "../commonFunc";
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
  const errorMessage = useSelector((state) =>
    getFormError(state, EDIT_PROFILE_FORM)
  );
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

  const setterForm = (e) =>
    setFormHendler(e, setForm, setErrors, validateSchema);
  const sendForm = () =>
    sendFormHendler(form, setForm, setErrors, onSubmit, validateSchema);

  return (
    <EmptyForm
      submitButtonText="Save"
      onSubmit={sendForm}
      errorMessage={errorMessage}
    >
      <Input
        placeholder="Name"
        name={fieldNames.name}
        onChange={setterForm}
        value={form.name}
        error={errors.name}
      />
      <Input
        placeholder="Surname"
        name={fieldNames.surmane}
        onChange={setterForm}
        value={form.surname}
        error={errors.surname}
      />
      <Input
        name={fieldNames.date}
        type="date"
        onChange={setterForm}
        value={form.date}
        error={errors.date}
      />
      <DropDown
        name={fieldNames.sex}
        option={option}
        onChange={setterForm}
        value={form.sex}
        error={errors.sex}
      />
    </EmptyForm>
  );
};
export default EditProfileForm;
