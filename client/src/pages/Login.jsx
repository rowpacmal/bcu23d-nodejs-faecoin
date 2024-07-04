import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignIn } from '../services/userService';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import updateFormData from '../utils/updateFormData';
import GlobalContext from '../contexts/GlobalContext';

import generalStyle from '../styles/general.module.css';
import style from '../styles/Form.module.css';

function Login() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);

  useEffect(() => {
    if (isValid) {
      navigate('/');
    } else {
      return;
    }
  });

  function handleChange(e) {
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = await userSignIn(formData);
      localStorage.setItem('TOKEN', token);

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
