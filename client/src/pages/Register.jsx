import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

import { userSignUp } from '../services/userService';
import { signFormData, updateFormData } from '../utils/formDataHandler';
import AppContext from '../contexts/AppContext';

import generalStyle from '../styles/App.module.css';
import style from '../styles/Form.module.css';

function Register() {
  const navigate = useNavigate();
  const { isValid, setIsValid, getUserInfo } = useContext(AppContext);

  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [toggleEye, setToggleEye] = useState(false);
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

  function handleToggleEye() {
    setToggleEye(!toggleEye);
  }

  return (
    <section className={`${generalStyle.container} ${style.section}`}>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.fields}>
          <div className={style.input}>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="password">Password </label>

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
            <Link to="/login">
              <button type="button">Back</button>
            </Link>

            <button type="submit" className={style.button}>
              Create
            </button>
          </div>

          <p className={style.text}>
            <input type="checkbox" name="newsletter" /> By signing up, you agree
            to our <Link>Terms of Use</Link>.
          </p>

          <p className={style.text}>
            <input type="checkbox" name="newsletter" /> Get the latest updates
            and exclusive offers directly in your inbox. Don&apos;t miss out!
          </p>
        </div>
      </form>
    </section>
  );
}

export default Register;
