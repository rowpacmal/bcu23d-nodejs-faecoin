import { useContext } from 'react';
import { IconTimelineEventPlus } from '@tabler/icons-react';
import AppContext from '../../contexts/AppContext';
import { mineTransactions } from '../../services/transactionService';

import style from '../../styles/Mine.module.css';
import Loading from '../../components/Loading';

function Mine() {
  const { getUserInfo, isMining, setIsMining } = useContext(AppContext);

  async function handleMineBlock() {
    setIsMining(true);

    try {
      const token = localStorage.getItem('TOKEN');

      await mineTransactions(token);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsMining(false);
    }

    getUserInfo();
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

      <div className={style.buttons}>
        {isMining ? (
          <Loading isSpinner={true} />
        ) : (
          <button onClick={handleMineBlock}>Mine block</button>
        )}
      </div>
    </>
  );
}

export default Mine;
