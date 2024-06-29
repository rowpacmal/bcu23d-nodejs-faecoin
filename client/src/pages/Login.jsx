import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignIn } from '../services/userService';
import updateFormData from '../utils/updateFormData';
import GlobalContext from '../contexts/GlobalContext';

function Login() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);
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
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = await userSignIn(formData);
    localStorage.setItem('TOKEN', token);

    setIsValid(true);
    navigate('/');
  }

  return (
    <section>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <br />
            <input
              name="email"
              type="text"
              placeholder="Email address..."
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password..."
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <button>Login</button>
      </form>
    </section>
  );
}

export default Login;
