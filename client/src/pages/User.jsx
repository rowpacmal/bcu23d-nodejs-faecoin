import { useEffect, useState } from 'react';
import { getUserAccount } from '../services/userService';
import { getWallet, mineTransactions } from '../services/transactionService';

function User() {
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});

  useEffect(() => {
    if (Object.values(user).length > 0) return;

    async function getUserInfo() {
      const token = localStorage.getItem('TOKEN');
      setUser((await getUserAccount(token)).data);
      setWallet((await getWallet(token)).data);
    }

    getUserInfo();
  });

  async function mineNewBlock() {
    const token = localStorage.getItem('TOKEN');
    await mineTransactions(token);
  }

  return (
    <>
      <h2>My Account</h2>

      <ul>
        <li>{wallet?.address}</li>

        <li>{wallet?.balance} FAE</li>

        <li>{user?.name}</li>

        <li>{user?.email}</li>
      </ul>

      <div>
        <button onClick={mineNewBlock}>Mine Transactions</button>
      </div>
    </>
  );
}

export default User;
