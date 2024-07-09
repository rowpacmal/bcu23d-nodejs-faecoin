import express from 'express';
import {
  getPendingWalletBalance,
  getWalletBalance,
} from '../controllers/walletController.mjs';
import { protectedAccess } from '../middlewares/authorization.mjs';

const walletRouter = express.Router();

walletRouter.use(protectedAccess);

walletRouter.route('/').get(getWalletBalance);
walletRouter.route('/pending').get(getPendingWalletBalance);

export default walletRouter;
