import { useEffect, useState } from 'react';
import { getAllBlocks } from '../services/blockchainService';

function Explorer() {
  const [blockchain, setBlockchain] = useState([]);

  useEffect(() => {
    if (blockchain.length > 0) return;

    async function getBlockchain() {
      setBlockchain((await getAllBlocks()).data);
    }

    getBlockchain();
  });

  return (
    <>
      <h2>Block Explorer</h2>
      <ul>
        {blockchain.map((block) => {
          return <li key={block.index}>{block.hash}</li>;
        })}
      </ul>
    </>
  );
}

export default Explorer;
