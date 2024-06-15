import express from 'express';

import blockchainRouter from './blockchainRoutes.mjs';
import transactionRouter from './transactionRoutes.mjs';
import userRouter from './userRoutes.mjs';

const mainRouter = express.Router();

mainRouter.use('/blockchain', blockchainRouter);
mainRouter.use('/transactions', transactionRouter);
mainRouter.use('/auth', (req, res, next) => {});
mainRouter.use('/admin/users', userRouter);

export default mainRouter;
