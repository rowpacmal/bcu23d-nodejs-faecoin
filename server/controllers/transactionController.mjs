import { blockchain, pubnub, transactionPool, wallet } from '../startup.mjs';

import asyncHandler from '../middlewares/asyncHandler.mjs';
import Miner from '../models/Miner.mjs';
import DataResponse from '../models/DataResponse.mjs';
import ErrorResponse from '../models/ErrorResponse.mjs';

export const addTransaction = (req, res, next) => {
  const { amount, recipient } = req.body;

  if (!amount || !recipient) {
    return next(new ErrorResponse('Recipient and/or amount is missing', 400));
  }

  if (typeof amount !== 'number') {
    return next(new ErrorResponse('Amount is not a valid number', 400));
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

export const mineTransactions = asyncHandler(async (req, res, next) => {
  const errorRes = new ErrorResponse('Transaction pool is empty', 400);
  const transactionMap = Object.values(transactionPool.transactionMap);

  if (!(transactionMap.length > 0)) {
    return next(errorRes);
  }

  if (
    !(transactionMap.length > 1) &&
    transactionMap[0].inputMap.address === process.env.DEFAULT_REWARD_ADDRESS
  ) {
    return next(errorRes);
  }

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
});
