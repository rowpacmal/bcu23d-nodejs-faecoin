export async function signFormData({
  e,
  formData,
  serviceFunction,
  getUserInfo,
  setIsValid,
  navigate,
  warning,
  setWarning,
  setIsVisible,
}) {
  e.preventDefault();

  try {
    const token = await serviceFunction(formData);
    localStorage.setItem('TOKEN', token);

    getUserInfo();
    setIsValid(true);
    navigate('/me');
  } catch (error) {
    if (warning) return;

    setWarning(error.message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => setWarning(null), 1000);
    }, 3000);
  }
}

export function updateFormData({ e, formData, setFormData }) {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });
}
