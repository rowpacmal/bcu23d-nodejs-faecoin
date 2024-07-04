import { useState } from 'react';
import updateFormData from '../utils/updateFormData';
import { addTransaction } from '../services/transactionService';

import formStyle from '../styles/Form.module.css';
import style from '../styles/Transaction.module.css';
import {
  IconArrowDown,
  IconArrowUpRight,
  IconMinus,
  IconPlus,
  IconRefresh,
  IconReplace,
} from '@tabler/icons-react';
import { NavLink, Outlet } from 'react-router-dom';

function Transaction() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
  });
  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(e) {
    updateFormData(e, formData, setFormData);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem('TOKEN');
      const data = {
        recipient: formData.recipient,
        amount: +formData.amount,
      };

      await addTransaction(token, data);

      setFormData({
        recipient: '',
        amount: '',
      });
    } catch (error) {
      if (warning) return;

      setWarning(error.message);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => setWarning(null), 1000);
      }, 3000);
    }
  }

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

export default Transaction;
