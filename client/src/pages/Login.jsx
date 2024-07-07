import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import Form from '../components/form/Form';

import { userSignIn } from '../services/userService';
import { signFormData, updateFormData } from '../utils/formDataHandler';

import generalStyle from '../styles/App.module.css';

const formLayout = [
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
    <button type="submit">Sign In</button>

    <Link to="/register">
      <button type="button" className={generalStyle.altButton}>
        Sign Up
      </button>
    </Link>
  </>
);
const formMessage = (
  <p className={generalStyle.text}>
    Forgot your password? <Link>Reset it by clicking here</Link>.
  </p>
);

function Login() {
  const navigate = useNavigate();
  const { isValid, setIsValid, getUserInfo } = useContext(AppContext);

  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
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
      serviceFunction: userSignIn,
      getUserInfo,
      setIsValid,
      navigate,
      warning,
      setWarning,
      setIsVisible,
    });
  }

  return (
    <section
      className={`${generalStyle.container} ${generalStyle.box} ${generalStyle.section}`}
    >
      <h2>Sign In</h2>

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

export default Login;
