import { useContext, useState } from 'react';
import { IconTimelineEventPlus } from '@tabler/icons-react';
import { mineTransactions } from '../../services/transactionService';
import AppContext from '../../contexts/AppContext';
import Loading from '../../components/Loading';

import style from './Mine.module.css';

function Mine() {
  const { getUserInfo, isMining, setIsMining, user } = useContext(AppContext);

  const [warning, setWarning] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  async function handleMineBlock() {
    setIsMining(true);

    try {
      const token = localStorage.getItem('TOKEN');

      await mineTransactions(token);

      getUserInfo();
    } catch (error) {
      if (warning) return;

      setWarning(error.message);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => setWarning(null), 1000);
      }, 3000);
    } finally {
      setIsMining(false);
    }
  }

  return (
    <>
      <h2>
        <IconTimelineEventPlus />
        Mine
      </h2>

      <section className={style.section}>
        <h3>Understanding Block Mining on FaeCoin</h3>

        <div className={style.paragraphs}>
          <p>
            Welcome to FaeCoin mining! When you mine a block, you are using
            computational power to solve complex mathematical problems. This
            process verifies and secures transactions, adding them to the
            blockchain. Each block contains a list of recent transactions, a
            reference to the previous block, and a unique cryptographic hash.
          </p>

          <p>
            Mining is essential to maintaining the decentralized nature of the
            FaeCoin network. By participating, you help ensure the network
            remains secure, transparent, and efficient. As a reward for your
            efforts, miners receive FaeCoin for each block they successfully add
            to the blockchain.
          </p>

          <p>Happy mining, and thank you for supporting the FaeCoin network!</p>
        </div>
      </section>

      {user.role === 'user' && (
        <p className={`${style.warning} ${style.show}`}>
          To access this service, please upgrade your account to
          &quot;Manager&quot; status
        </p>
      )}

      <div className={style.buttons}>
        {isMining ? (
          <Loading setSpinner={true} />
        ) : (
          <>
            <button
              onClick={handleMineBlock}
              disabled={user.role === 'user' ? true : false}
            >
              Mine block
            </button>

            <p
              className={`${style.warning}${isVisible ? ` ${style.show}` : ''}`}
            >
              {warning}
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Mine;
