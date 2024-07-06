import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

import { userSignIn } from '../services/userService';
import { signFormData, updateFormData } from '../utils/formDataHandler';
import AppContext from '../contexts/AppContext';

import generalStyle from '../styles/general.module.css';
import style from '../styles/Form.module.css';

function Login() {
  const navigate = useNavigate();
  const { isValid, setIsValid, getUserInfo } = useContext(AppContext);

  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
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

  function handleToggleEye() {
    setToggleEye(!toggleEye);
  }

  return (
    <section className={`${generalStyle.container} ${style.section}`}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.fields}>
          <div className={style.input}>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.input}>
            <label htmlFor="password">Password</label>

            <span className={style.eye} onClick={handleToggleEye}>
              {!toggleEye ? <IconEye size={20} /> : <IconEyeClosed size={20} />}
            </span>

            <input
              id="password"
              name="password"
              type={!toggleEye ? 'password' : 'text'}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={style.control}>
          <p className={`${style.warning}${isVisible ? ` ${style.show}` : ''}`}>
            {warning}
          </p>

          <div className={style.buttons}>
            <button type="submit">Sign In</button>

            <Link to="/register">
              <button type="button" className={style.button}>
                Sign Up
              </button>
            </Link>
          </div>

          <p className={style.text}>
            Forgot your password? <Link>Reset it by clicking here</Link>.
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
