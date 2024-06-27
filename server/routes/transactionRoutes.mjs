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

transactionRouter.use(protectedAccess);

transactionRouter.route('/').get(getTransactionPool);
transactionRouter.route('/wallet').get(getWalletBalance);

// transactionRouter.use(authorizedAccess('manager', 'admin'));

transactionRouter.route('/add').post(addTransaction);
transactionRouter.route('/mine').get(mineTransactions);

export default transactionRouter;
