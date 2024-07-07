import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import Form from '../components/form/Form';

import { userSignUp } from '../services/userService';
import { signFormData, updateFormData } from '../utils/formDataHandler';

import generalStyle from '../styles/App.module.css';
import style from '../styles/Form.module.css';

const formLayout = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter full name',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email address',
    required: true,
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
  },
];
const formButtons = (
  <>
    <Link to="/login">
      <button type="button">Back</button>
    </Link>

    <button type="submit" className={style.button}>
      Create
    </button>
  </>
);
const formMessage = (
  <>
    <p className={style.text}>
      <input type="checkbox" name="terms" required /> By signing up, you agree
      to our <Link>Terms of Use</Link>.
    </p>

    <p className={style.text}>
      <input type="checkbox" name="newsletter" /> Get the latest updates and
      exclusive offers directly in your inbox. Don&apos;t miss out!
    </p>
  </>
);

function Register() {
  const navigate = useNavigate();
  const { isValid, setIsValid, getUserInfo } = useContext(AppContext);

  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isValid) {
      navigate('/');
    } else {
      return;
    }
  });

  function handleChange(e) {
    updateFormData({ e, formData, setFormData });
  }

  async function handleSubmit(e) {
    signFormData({
      e,
      formData,
      serviceFunction: userSignUp,
      getUserInfo,
      setIsValid,
      navigate,
      warning,
      setWarning,
      setIsVisible,
    });
  }

  return (
    <section className={`${generalStyle.container} ${style.section}`}>
      <h2>Sign Up</h2>

      <Form
        formLayout={formLayout}
        formButtons={formButtons}
        formMessage={formMessage}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        warning={warning}
      />
    </section>
  );
}

export default Register;
