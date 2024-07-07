import style from '../../styles/BlockOverview.module.css';
import CopyButton from '../CopyButton';

function BlockOverview({ activeBlock }) {
  return (
    <section className={style.section}>
      <h2>Block Overview</h2>

      {Object.values(activeBlock).length > 0 ? (
        <>
          <ul className={style.ul}>
            <li>
              <span>Block Height</span>
              <span className={style.divider}></span>
              <span>{activeBlock?.index}</span>
            </li>

            <li>
              <span>Timestamp</span>
              <span className={style.divider}></span>
              <span>
                {new Date(activeBlock?.timestamp).toLocaleDateString('sv-SE')}
              </span>
            </li>

            <li>
              <span>Transactions</span>
              <span className={style.divider}></span>
              <span>
                {activeBlock?.data?.length} transactions in this block
              </span>
            </li>

            <li>
              <span>Fee Recipient</span>
              <span className={style.divider}></span>
              <span>reward-address</span>
            </li>

            <li>
              <span>Block Reward</span>
              <span className={style.divider}></span>
              <span>100 FAE</span>
            </li>

            <li>
              <span>Total Difficulty</span>
              <span className={style.divider}></span>
              <span>{activeBlock?.difficulty}</span>
            </li>

            <li>
              <span>Hash</span>
              <span className={style.divider}></span>
              <span>
                {activeBlock?.hash?.length > 1
                  ? `${activeBlock?.hash.slice(0, 4)}-${activeBlock?.hash.slice(
                      -4
                    )}`
                  : activeBlock?.hash}
              </span>
              <CopyButton copyToClipboard={activeBlock?.hash} />
            </li>

            <li>
              <span>Previous Hash</span>
              <span className={style.divider}></span>
              <span>
                {activeBlock?.prevHash?.length > 1
                  ? `${activeBlock?.prevHash?.slice(
                      0,
                      4
                    )}-${activeBlock?.prevHash?.slice(-4)}`
                  : activeBlock?.prevHash}
              </span>
              <CopyButton copyToClipboard={activeBlock?.prevHash} />
            </li>

            <li>
              <span>Nonce</span>
              <span className={style.divider}></span>
              <span>{activeBlock?.nonce}</span>
            </li>
          </ul>

          <section>
            <h3>Block Transactions</h3>
          </section>
        </>
      ) : (
        <p>Please select a block...</p>
      )}
    </section>
  );
}

export default BlockOverview;
