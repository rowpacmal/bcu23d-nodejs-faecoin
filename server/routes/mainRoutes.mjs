import express from 'express';

import authRouter from './authRoutes.mjs';
import blockchainRouter from './blockchainRoutes.mjs';
import transactionRouter from './transactionRoutes.mjs';
import userRouter from './userRoutes.mjs';

const mainRouter = express.Router();

mainRouter.use('/admin/users', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/blockchain', blockchainRouter);
mainRouter.use('/transactions', transactionRouter);

export default mainRouter;
