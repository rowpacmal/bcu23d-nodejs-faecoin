import { IconBox } from '@tabler/icons-react';

import style from './LatestBlocks.module.css';

function LatestBlocks({ blockchain, setActiveBlock }) {
  return (
    <section className={style.section}>
      <h2>Latest Blocks</h2>

      <ul className={style.ul}>
        {blockchain.map((block) => (
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
              <span className={style.text}>
                {new Date(block?.timestamp).toLocaleDateString('sv-SE')}
              </span>
            </div>

            <div className={style.info}>
              <span>
                Miner:{' '}
                {block?.miner
                  ? `${block?.miner?.address?.slice(
                      0,
                      4
                    )}-${block?.miner?.address?.slice(-4)}`
                  : '---'}
              </span>
              <span className={style.text}>
                {block?.data?.length} txns in this block
              </span>
            </div>

            <div className={style.info}>
              <span className={style.reward}>
                {block?.miner ? block?.miner?.reward?.toFixed(2) : '0.00'} Fae
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LatestBlocks;
