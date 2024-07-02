import { useEffect, useState } from 'react';
import { editUserDetails, getUserAccount } from '../services/userService';
import { mineTransactions } from '../services/transactionService';
import { getWalletBalance } from '../services/walletService';

import generalStyle from '../styles/general.module.css';
import style from '../styles/User.module.css';
import { IconHash } from '@tabler/icons-react';

function User() {
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({
    address: '',
    balance: 0,
  });

  async function getUserInfo() {
    const token = localStorage.getItem('TOKEN');

    setUser(await getUserAccount(token));
    setWallet(await getWalletBalance(token));
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function handleUpgradeAccount() {
    const token = localStorage.getItem('TOKEN');

    await editUserDetails(token, { role: 'manager' });

    getUserInfo();
  }

  async function handleMineBlock() {
    const token = localStorage.getItem('TOKEN');

    await mineTransactions(token);

    getUserInfo();
  }

  return (
    <div className={generalStyle.container}>
      <section className={style.section}>
        <div className={style.wrapper}>
          <h2>My Account</h2>

          <ul className={style.wallet}>
            <li>
              <IconHash />
              {`${wallet?.address.slice(0, 4)}-${wallet?.address.slice(-4)}`}
            </li>

            <li>{wallet?.balance.toFixed(2)} FAE</li>
          </ul>

          <ul className={style.info}>
            <li>
              <span className={style.label}>Name</span>

              <span className={style.span}>{user?.name}</span>
            </li>

            <li>
              <span className={style.label}>Email</span>

              <span className={style.span}>{user?.email}</span>
            </li>

            <li>
              <span className={style.label}>Role</span>

              <span className={style.span}>{user?.role}</span>
            </li>
          </ul>

          <div className={style.buttons}>
            <button
              onClick={handleUpgradeAccount}
              disabled={user?.role !== 'user' ? true : false}
            >
              Upgrade
            </button>

            <button
              onClick={handleMineBlock}
              disabled={user?.role !== 'user' ? false : true}
            >
              Mine Block
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default User;
