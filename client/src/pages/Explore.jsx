import { useEffect, useState } from 'react';
import { getAllBlocks } from '../services/blockchainService';

import BlockOverview from '../components/explore/BlockOverview';
import LatestBlocks from '../components/explore/LatestBlocks';
import Demo from '../components/Demo';

import generalStyle from '../App.module.css';
import style from './Explore.module.css';

function Explore() {
  const [blockchain, setBlockchain] = useState([]);
  const [activeBlock, setActiveBlock] = useState({});
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function getBlockchain() {
      const getBlockchain = await getAllBlocks();
      const temp = [];

      getBlockchain.forEach((block) => {
        const list = [];

        block?.data?.forEach((transaction) => {
          const outputMap = Object.entries(transaction?.outputMap);
          const inputMap = transaction?.inputMap;

          outputMap.forEach((entry) => {
            if (entry[0] === inputMap.address) {
              return;
            }

            entry.unshift(inputMap.address);
            list.unshift(entry);
          });
        });

        block.data = list;

        temp.push(block);
      });

      setBlockchain(temp.sort((a, b) => b.index - a.index));
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
    <div className={`${generalStyle.container} ${style.container}`}>
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

          <Demo />
        </div>
      )}
    </div>
  );
}

export default Explore;
