import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignIn } from '../services/userService';
import updateFormData from '../utils/updateFormData';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');

    if (token) {
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

    const token = (await userSignIn(formData)).data;
    localStorage.setItem('TOKEN', token);

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
