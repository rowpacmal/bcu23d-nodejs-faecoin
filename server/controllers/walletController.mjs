import { blockchain, transactionPool, wallet } from '../startup.mjs';

import Wallet from '../models/Wallet.mjs';
import DataResponse from '../models/DataResponse.mjs';

export const getWalletBalance = (req, res, next) => {
  const transactionMap = Object.values(transactionPool.transactionMap);
  const address = wallet.publicKey;
  const walletBalance = Wallet.calculateBalance({
    chain: blockchain.chain,
    address,
  });
  let balance;

  if (transactionMap.length > 0) {
    transactionMap.forEach((transaction) => {
      if (transaction.inputMap.address === address) {
        balance = transaction.outputMap[address];
      } else {
        balance = walletBalance;
      }
    });
  } else {
    balance = walletBalance;
  }

  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched balance',
      statusCode: 200,
      data: { address, balance },
    })
  );
};
