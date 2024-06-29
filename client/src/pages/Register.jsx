import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '../services/userService';
import updateFormData from '../utils/updateFormData';
import GlobalContext from '../contexts/GlobalContext';

function Register() {
  const navigate = useNavigate();
  const { isValid, setIsValid } = useContext(GlobalContext);
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
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = await userSignUp(formData);
    localStorage.setItem('TOKEN', token);

    setIsValid(true);
    navigate('/');
  }

  return (
    <section>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <br />
            <input
              name="name"
              type="text"
              placeholder="Full name..."
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

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

        <button>Create</button>
      </form>
    </section>
  );
}

export default Register;
