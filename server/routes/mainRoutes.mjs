import express from 'express';

import blockchainRouter from './blockchainRoutes.mjs';
import transactionRouter from './transactionRoutes.mjs';

const mainRouter = express.Router();

mainRouter.use('/blockchain', blockchainRouter);
mainRouter.use('/transactions', transactionRouter);

export default mainRouter;
