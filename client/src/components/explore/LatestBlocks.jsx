import { IconBox } from '@tabler/icons-react';

import style from './LatestBlocks.module.css';
import { useEffect, useState } from 'react';

function LatestBlocks({ blockchain, setActiveBlock }) {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const temp = [];

    blockchain.forEach((block) => {
      temp.push(block);
    });

    setBlocks(temp);
  }, [blockchain]);

  return (
    <section className={style.section}>
      <h2>Latest Blocks</h2>

      <ul className={style.ul}>
        {blockchain
          .sort((a, b) => b.index - a.index)
          .map((block) => (
            <li key={block?.index} className={style.li}>
              <div>
                <button
                  className={style.button}
                  onClick={() => setActiveBlock(block)}
                >
                  <IconBox size={'2rem'} />
                </button>
              </div>

              <div className={style.info}>
                <span className={style.label}>{block?.index}</span>
                <span className={style.text}>Block</span>
              </div>

              <div className={style.info}>
                <span>
                  {block?.data?.length > 0
                    ? block?.data[0]?.inputMap?.address === 'reward-address'
                      ? `${Object.keys(block?.data[0]?.outputMap)[0]?.slice(
                          0,
                          4
                        )}-${Object.keys(block?.data[0]?.outputMap)[0]?.slice(
                          -4
                        )}`
                      : '---'
                    : '---'}
                </span>
                <span className={style.text}>Miner</span>
              </div>

              <div className={style.info}>
                <span className={style.reward}>100.00 Fae</span>
                <span className={style.text}>Reward</span>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default LatestBlocks;
