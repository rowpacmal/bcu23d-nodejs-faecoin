import { useContext, useState } from 'react';
import { IconUserCircle } from '@tabler/icons-react';
import AppContext from '../../contexts/AppContext';
import { updateFormData } from '../../utils/formDataHandler';
import Form from '../../components/form/Form';
import { editUserDetails } from '../../services/userService';

const formLayout = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter full name',
    required: true,
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter email address',
    required: true,
  },
  {
    select: true,
    options: [
      {
        label: 'User',
        value: 'user',
      },
      {
        label: 'Manager',
        value: 'manager',
      },
    ],
    label: 'Role',
    name: 'role',
    required: true,
  },
];
const formButtons = <button type="submit">Update profile</button>;

function Profile() {
  const { user, getUserInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    role: user?.role,
  });

  function handleChange(e) {
    updateFormData({ e, formData, setFormData });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('TOKEN');

      await editUserDetails(token, formData);

      getUserInfo();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <h2>
        <IconUserCircle />
        Profile
      </h2>

      <section>
        <h3>Account Details</h3>

        <Form
          formLayout={formLayout}
          formButtons={formButtons}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
}

export default Profile;
