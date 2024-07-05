import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IconCoins, IconWallet } from '@tabler/icons-react';
import UserContext from '../contexts/UserContext';

import { getUserAccount } from '../services/userService';
import { mineTransactions } from '../services/transactionService';
import { getWalletBalance } from '../services/walletService';

import generalStyle from '../styles/general.module.css';
import style from '../styles/User.module.css';
import Loading from '../components/Loading';

function User() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({
    address: '',
    balance: 0,
  });

  async function getUserInfo() {
    setIsLoading(true);

    try {
      const token = localStorage.getItem('TOKEN');

      setUser(await getUserAccount(token));
      setWallet(await getWalletBalance(token));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function handleMineBlock() {
    const token = localStorage.getItem('TOKEN');

    await mineTransactions(token);

    getUserInfo();
  }

  return (
    <>
      <div className={`${generalStyle.container} ${style.wrapper}`}>
        <div className={style.walletBox}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={style.wallet}>
              <div className={style.icon}>
                <IconWallet size={40} />
              </div>

              <div className={style.address}>
                <span className={style.label}>Wallet address</span>
                <span className={`${style.span} ${style.big}`}>
                  <div className={style.addressWrapper}>{wallet?.address}</div>
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
          )}
        </div>

        <div className={style.box}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={style.profile}>
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
                <UserContext.Provider value={{ isLoading, user }}>
                  <Outlet />
                </UserContext.Provider>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
