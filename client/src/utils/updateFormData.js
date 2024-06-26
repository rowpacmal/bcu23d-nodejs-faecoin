function updateFormData(e, formData, setFormData) {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });
}

export default updateFormData;
