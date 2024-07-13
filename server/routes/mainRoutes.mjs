import express from 'express';

import authRouter from './authRoutes.mjs';
import blockchainRouter from './blockchainRoutes.mjs';
import transactionRouter from './transactionRoutes.mjs';
import walletRouter from './walletRoutes.mjs';

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/blockchain', blockchainRouter);
mainRouter.use('/transactions', transactionRouter);
mainRouter.use('/wallet', walletRouter);

export default mainRouter;
