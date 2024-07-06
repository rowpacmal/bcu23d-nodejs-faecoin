import { useContext, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import UserContext from '../contexts/UserContext';
import updateFormData from '../utils/updateFormData';

import formStyle from '../styles/Form.module.css';

function Profile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    role: user?.role,
  });

  function handleChange(e) {
    updateFormData(e, userData, setUserData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <h2>
        <IconUserCircle />
        Profile
      </h2>

      <section>
        <h3>Account Details</h3>

        <form onSubmit={handleSubmit} className={formStyle.form}>
          <div className={formStyle.fields}>
            <div className={formStyle.input}>
              <label htmlFor="name">Name</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={userData?.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={formStyle.input}>
              <label htmlFor="email">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={userData?.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={formStyle.input}>
              <label htmlFor="role">Role</label>

              <select
                id="role"
                name="role"
                value={userData?.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>

                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          <div className={formStyle.control}>
            <div className={formStyle.buttons}>
              <button type="submit">Update profile</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
