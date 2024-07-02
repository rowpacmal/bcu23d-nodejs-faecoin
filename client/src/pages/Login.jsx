import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { userSignIn } from '../services/userService';
import updateFormData from '../utils/updateFormData';
import GlobalContext from '../contexts/GlobalContext';

import generalStyle from '../styles/general.module.css';
import style from '../styles/Login.module.css';

function Login() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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
      navigate('/');
    } catch (error) {
      if (warning) return;

      setWarning(error.message);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => setWarning(null), 2000);
      }, 3000);
    }
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
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={style.input}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={style.control}>
          <p className={`${style.warning}${isVisible ? ` ${style.show}` : ''}`}>
            {warning}
          </p>

          <div className={style.buttons}>
            <button>Sign In</button>

            <NavLink to="/register">
              <button className={style.signup}>Sign Up</button>
            </NavLink>
          </div>

          <p className={style.welcome}>
            Forgot your password? <Link>Reset it by clicking here</Link>.
          </p>
        </div>
      </form>
    </section>
  );
}

export default Login;
