import express from 'express';
import { getWalletBalance } from '../controllers/transactionController.mjs';
import { protectedAccess } from '../middlewares/authorization.mjs';

const walletRouter = express.Router();

walletRouter.use(protectedAccess);

walletRouter.route('/').get(getWalletBalance);

export default walletRouter;
