import { blockchain, pubnub, transactionPool, wallet } from '../startup.mjs';
import Miner from '../models/Miner.mjs';
import Wallet from '../models/Wallet.mjs';
import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const addTransaction = (req, res, next) => {
  const { amount, recipient } = req.body;

  if (!amount || !recipient)
    return next(
      new ErrorResponse('Invalid request, Amount and Recipient expected', 400)
    );

  let transaction = transactionPool.transactionExist(wallet.publicKey);

  try {
    if (transaction) {
      transaction.update({ sender: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({
        recipient,
        amount,
        chain: blockchain.chain,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, error: error.message });
  }

  transactionPool.addTransaction(transaction);
  pubnub.broadcastTransaction(transaction);

  res.status(201).json({ success: true, statusCode: 201, data: transaction });
};

export const getWalletBalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = Wallet.calculateBalance({
    chain: blockchain.chain,
    address,
  });

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: { address, balance },
  });
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: transactionPool.transactionMap,
  });
};

export const mineTransactions = async (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubnub,
  });

  await miner.mineTransaction();

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: 'Successfully mined a block',
  });
};
