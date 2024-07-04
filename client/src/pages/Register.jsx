import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignUp } from '../services/userService';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
import updateFormData from '../utils/updateFormData';
import GlobalContext from '../contexts/GlobalContext';

import generalStyle from '../styles/general.module.css';
import style from '../styles/Form.module.css';

function Register() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: '',
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
      const token = await userSignUp(formData);
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
