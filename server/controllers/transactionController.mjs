import { blockchain, pubnub, transactionPool, wallet } from '../startup.mjs';
import Miner from '../models/Miner.mjs';
import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const addTransaction = (req, res, next) => {
  const { amount, recipient } = req.body;

  if (!amount || !recipient) {
    return next(new ErrorResponse('Recipient and/or amount is missing', 400));
  }

  let transaction = transactionPool.transactionExist(wallet.publicKey);

  if (transaction) {
    transaction.update({ sender: wallet, recipient, amount });
  } else {
    transaction = wallet.createTransaction({
      recipient,
      amount,
      chain: blockchain.chain,
    });
  }

  transactionPool.addTransaction(transaction);
  pubnub.broadcastTransaction(transaction);

  res.status(201).json(
    new DataResponse({
      message: 'Successfully added a transaction',
      statusCode: 201,
      data: transaction,
    })
  );
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json(
    new DataResponse({
      message: 'Successfully fetched transactions',
      statusCode: 200,
      data: transactionPool.transactionMap,
    })
  );
};

export const mineTransactions = async (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubnub,
  });

  await miner.mineTransaction();

  res.status(200).json(
    new DataResponse({
      message: 'Successfully mined a block',
      statusCode: 200,
    })
  );
};
