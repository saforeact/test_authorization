export const setFormHendler = (e, setForm, setErrors, validateSchema) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({ ...prevForm, [name]: value }));

  setErrors((prevForm) => ({
    ...prevForm,
    [name]: validateSchema(name, value),
  }));
};

export const sendFormHendler = (
  form,
  setForm,
  setErrors,
  onSubmit,
  validateSchema
) => {
  let isValid = true;
  let letNewForm = {};
  for (let key in form) {
    letNewForm = { ...letNewForm, [key]: "" };
    const error = validateSchema(key, form[key].trim());
    setErrors((prevForm) => ({
      ...prevForm,
      [key]: error,
    }));
    if (error) {
      isValid = false;
    }
  }
  if (isValid) {
    onSubmit(form);
    // setForm(letNewForm);
  }
};
