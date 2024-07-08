import CopyButton from '../CopyButton';
import { IconReceipt } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import style from './BlockOverview.module.css';

function BlockOverview({ activeBlock }) {
  const [transactionsList, setTransactionList] = useState([]);

  useEffect(() => {
    if (activeBlock?.data?.length === 0) {
      setTransactionList([]);
      return;
    }

    const temp = [];

    activeBlock?.data?.forEach((transaction) => {
      const outputMap = Object.entries(transaction?.outputMap);
      const inputMap = transaction?.inputMap;

      outputMap.forEach((ent) => {
        if (ent[0] === inputMap.address) return;
        ent.unshift(inputMap.address);
        temp.unshift(ent);
      });
    });

    setTransactionList(temp);
  }, [activeBlock]);

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
              <span>{transactionsList.length} transactions in this block</span>
            </li>

            <li>
              <span>Fee Recipient</span>
              <span className={style.divider}></span>
              <span className={style.nowrap}>
                {transactionsList.length > 0 ? (
                  transactionsList.at(-1)[0] === 'reward-address' ? (
                    <>
                      {transactionsList.at(-1)[1].slice(0, 4)}-
                      {transactionsList.at(-1)[1].slice(-4)}
                      <CopyButton
                        copyToClipboard={transactionsList.at(-1)[1]}
                      />
                    </>
                  ) : (
                    '0'
                  )
                ) : (
                  '0'
                )}
              </span>
            </li>

            <li>
              <span>Block Reward</span>
              <span className={style.divider}></span>
              <span>
                {transactionsList.length > 0
                  ? transactionsList.at(-1)[0] === 'reward-address'
                    ? `${transactionsList.at(-1)[2]} FAE`
                    : '0 FAE'
                  : '0 FAE'}
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
              {transactionsList.length > 0 ? (
                transactionsList.map((transaction, index) => (
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

                      <span className={style.label}>Amount</span>
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
