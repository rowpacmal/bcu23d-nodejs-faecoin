import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  getWalletBalance,
  mineTransactions,
} from '../controllers/transactionController.mjs';
import {
  authorizedAccess,
  protectedAccess,
} from '../middlewares/authorization.mjs';

const transactionRouter = express.Router();

transactionRouter.route('/').get(getTransactionPool);

transactionRouter.use(protectedAccess);

transactionRouter.route('/wallet').get(getWalletBalance);
transactionRouter.route('/add').post(addTransaction);
transactionRouter.route('/mine').get(mineTransactions);

export default transactionRouter;
