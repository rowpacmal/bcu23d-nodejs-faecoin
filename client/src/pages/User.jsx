import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IconCoins, IconWallet } from '@tabler/icons-react';
import UserContext from '../contexts/UserContext';

import { editUserDetails, getUserAccount } from '../services/userService';
import { mineTransactions } from '../services/transactionService';
import { getWalletBalance } from '../services/walletService';

import generalStyle from '../styles/general.module.css';
import style from '../styles/User.module.css';

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
    <>
      <div className={`${generalStyle.container} ${style.wrapper}`}>
        <div className={`${style.walletBox} ${style.wallet}`}>
          <div className={style.icon}>
            <IconWallet size={40} />
          </div>

          <div className={style.address}>
            <span className={style.label}>Wallet address</span>
            <span className={`${style.span} ${style.big}`}>
              {wallet?.address?.slice(0, 12)}...
            </span>
          </div>

          <div className={style.balance}>
            <span className={style.label}>Balance</span>
            <span className={`${style.span} ${style.big}`}>
              {wallet?.balance?.toFixed(2)}
            </span>
          </div>

          <div className={style.icon}>
            <IconCoins size={40} />
          </div>
        </div>

        <div className={`${style.box} ${style.profile}`}>
          <nav className={style.nav}>
            <ul>
              <li>
                <NavLink to="/me/overview">
                  <span className="account">Profile</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/me/exchange">
                  <span className="account">Exchange</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/me/stake">
                  <span className="account">Stake</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <section className={style.section}>
            <UserContext.Provider value={{ user }}>
              <Outlet />
            </UserContext.Provider>
          </section>
        </div>
      </div>
    </>
  );
}

export default User;
