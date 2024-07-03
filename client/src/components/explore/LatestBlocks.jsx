import { IconBox } from '@tabler/icons-react';

import style from '../../styles/LatestBlocks.module.css';

function LatestBlocks({ blockchain, setActiveBlock }) {
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
                <span className={style.text}>
                  {new Date(block?.timestamp).toLocaleDateString('sv-SE')}
                </span>
              </div>

              <div className={style.info}>
                <span className={style.miner}>
                  Miner:{' '}
                  {block?.data?.length > 0
                    ? block?.data?.at(-1)?.inputMap?.address
                    : '---'}
                </span>
                <span className={style.text}>
                  {block?.data?.length} txns in this block
                </span>
              </div>

              <span className={style.reward}>100.00 Fae</span>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default LatestBlocks;
