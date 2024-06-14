import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
} from '../controllers/transactionController.mjs';

const transactionRouter = express.Router();

transactionRouter.route('/').get(getTransactionPool).post(addTransaction);

transactionRouter.route('/balance').get(getWalletBalance);

transactionRouter.route('/mine').get(mineTransactions);

export default transactionRouter;
