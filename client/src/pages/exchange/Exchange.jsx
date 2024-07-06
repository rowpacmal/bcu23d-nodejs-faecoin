import { NavLink, Outlet } from 'react-router-dom';
import {
  IconArrowDown,
  IconArrowUpRight,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconReplace,
} from '@tabler/icons-react';

import style from '../../styles/Transaction.module.css';

function Exchange() {
  return (
    <>
      <h2>
        <IconReplace />
        Exchange
      </h2>

      <div className={style.wrapper}>
        <Outlet />

        <nav className={style.nav}>
          <ul className={style.ul}>
            <li>
              <NavLink to="/me/exchange/buy">
                <span className={`account ${style.span}`}>
                  <div className={style.icon}>
                    <IconPlus size={16} />
                    Buy
                  </div>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/me/exchange/sell">
                <span className={`account ${style.span}`}>
                  <div className={style.icon}>
                    <IconMinus size={16} />
                    Sell
                  </div>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/me/exchange/swap">
                <span className={`account ${style.span}`}>
                  <div className={style.icon}>
                    <IconRefresh size={16} />
                    Swap
                  </div>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/me/exchange/send">
                <span className={`account ${style.span}`}>
                  <div className={style.icon}>
                    <IconArrowUpRight size={16} />
                    Send
                  </div>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/me/exchange/receive">
                <span className={`account ${style.span}`}>
                  <div className={style.icon}>
                    <IconArrowDown size={16} />
                    Receive
                  </div>
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Exchange;
