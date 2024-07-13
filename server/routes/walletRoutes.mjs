import express from 'express';
import { getWalletBalance } from '../controllers/walletController.mjs';
import { protectedAccess } from '../middlewares/authorization.mjs';

const walletRouter = express.Router();

walletRouter.use(protectedAccess);

walletRouter.route('/').get(getWalletBalance);

export default walletRouter;
