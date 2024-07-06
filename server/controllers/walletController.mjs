import { blockchain, wallet } from '../startup.mjs';
import Wallet from '../models/Wallet.mjs';
import DataResponse from '../models/DataResponse.mjs';

export const getWalletBalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({
    chain: blockchain.chain,
    address,
  });

  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched balance',
      statusCode: 200,
      data: { address, balance },
    })
  );
};
