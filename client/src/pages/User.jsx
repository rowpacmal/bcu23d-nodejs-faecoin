import { useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService';

function User() {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log('effect');
    if (Object.values(user).length > 0) return;

    async function getUserInfo() {
      setUser((await getUserAccount(localStorage.getItem('TOKEN'))).data);
    }

    getUserInfo();
  });

  return (
    <>
      <h2>My Account</h2>

      <ul>
        <li>{user?._id}</li>

        <li>{user?.name}</li>

        <li>{user?.email}</li>
      </ul>
    </>
  );
}

export default User;
