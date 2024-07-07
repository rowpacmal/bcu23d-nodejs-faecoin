import { useEffect, useState } from 'react';
import { getAllBlocks } from '../services/blockchainService';
import LatestBlocks from '../components/explore/LatestBlocks';

import generalStyle from '../styles/App.module.css';
import style from './Explore.module.css';
import BlockOverview from '../components/explore/BlockOverview';

function Explore() {
  const [blockchain, setBlockchain] = useState([]);
  const [activeBlock, setActiveBlock] = useState({});
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function getBlockchain() {
      setBlockchain(await getAllBlocks());
    }

    getBlockchain();
  }, []);

  function handleTabs(e) {
    switch (e.target.innerText) {
      case 'Blocks':
        setToggle(false);
        break;

      case 'Transactions':
        setToggle(true);
        break;

      default:
        return;
    }
  }

  return (
    <div className={`${generalStyle.container} ${style.wrapper}`}>
      <div>
        <button
          className={`${style.button}${!toggle ? ` ${style.active}` : ''}`}
          onClick={handleTabs}
        >
          Blocks
        </button>

        <button
          className={`${style.button}${toggle ? ` ${style.active}` : ''}`}
          onClick={handleTabs}
        >
          Transactions
        </button>
      </div>

      {!toggle ? (
        <div className={style.explorer}>
          <div className={style.blocks}>
            <LatestBlocks
              blockchain={blockchain}
              setActiveBlock={setActiveBlock}
            />
          </div>

          <div className={style.overview}>
            <BlockOverview blockchain={blockchain} activeBlock={activeBlock} />
          </div>
        </div>
      ) : (
        <div className={style.transactions}>
          <h2>Latest Transactions</h2>
        </div>
      )}
    </div>
  );
}

export default Explore;
