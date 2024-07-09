import CopyButton from '../CopyButton';
import { IconReceipt } from '@tabler/icons-react';

import style from './BlockOverview.module.css';

function BlockOverview({ activeBlock }) {
  return (
    <section className={style.section}>
      <h2>Block Overview</h2>

      {Object.values(activeBlock).length > 0 ? (
        <>
          <ul className={style.overview}>
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
              <span>
                {activeBlock?.miner
                  ? `${activeBlock?.miner?.address?.slice(
                      0,
                      4
                    )}-${activeBlock?.miner?.address?.slice(-4)}`
                  : '---'}
              </span>
              {activeBlock?.miner && (
                <CopyButton copyToClipboard={activeBlock?.miner?.address} />
              )}
            </li>

            <li>
              <span>Block Reward</span>
              <span className={style.divider}></span>
              <span>
                {activeBlock?.miner
                  ? activeBlock?.miner?.reward?.toFixed(2)
                  : '0.00'}{' '}
                FAE
              </span>
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

            <ul className={style.ul}>
              {activeBlock?.data?.length > 0 ? (
                activeBlock?.data?.map((transaction, index) => (
                  <li key={index} className={style.li}>
                    <div>
                      <button className={style.button}>
                        <IconReceipt />
                      </button>
                    </div>

                    <div className={style.info}>
                      <span className={style.text}>
                        {`${transaction[0].slice(0, 4)}-${transaction[0].slice(
                          -4
                        )}`}

                        <CopyButton copyToClipboard={transaction[0]} />
                      </span>

                      <span className={style.label}>Sender</span>
                    </div>

                    <div className={style.info}>
                      <span className={style.text}>
                        {`${transaction[1].slice(0, 4)}-${transaction[1].slice(
                          -4
                        )}`}

                        <CopyButton copyToClipboard={transaction[1]} />
                      </span>

                      <span className={style.label}>Recipient</span>
                    </div>

                    <div className={style.info}>
                      <span className={style.reward}>
                        {transaction[2].toFixed(2)} Fae
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>There are no transactions in this block...</li>
              )}
            </ul>
          </section>
        </>
      ) : (
        <p>Please select a block...</p>
      )}
    </section>
  );
}

export default BlockOverview;
