import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { IconCoins, IconWallet } from '@tabler/icons-react';

import AppContext from '../../contexts/AppContext';
import Loading from '../../components/Loading';

import generalStyle from '../../styles/App.module.css';
import style from './User.module.css';
import CopyButton from '../../components/CopyButton';

function User() {
  const { isLoading, wallet, pendingBalance } = useContext(AppContext);

  return (
    <>
      <div className={`${generalStyle.container} ${style.wrapper}`}>
        <div className={`${generalStyle.box} ${style.walletBox}`}>
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
                  <div>
                    {wallet?.address?.length > 1
                      ? `${wallet?.address?.slice(
                          0,
                          4
                        )}-${wallet?.address?.slice(-4)}`
                      : wallet?.address}
                  </div>

                  <div>
                    <CopyButton copyToClipboard={wallet?.address} />
                  </div>
                </span>
              </div>

              <div className={style.balance}>
                <span className={style.label}>Balance</span>

                <span className={`${style.span} ${style.big}`}>
                  <div>
                    {pendingBalance?.toFixed(2) || wallet?.balance?.toFixed(2)}
                  </div>
                </span>
              </div>

              <div className={style.icon}>
                <IconCoins size={40} />
              </div>
            </div>
          )}
        </div>

        <div className={`${generalStyle.box} ${style.box}`}>
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
                    <NavLink to="/me/mine">
                      <span className="account">Mine</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>

              <section className={style.section}>
                <Outlet />
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
