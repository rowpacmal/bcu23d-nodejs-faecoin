import express from 'express';
import dotenv from 'dotenv';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import PubNubServer from './models/PubNubServer.mjs';

import errorHandler from './middlewares/errorHandler.mjs';
import resourceNotFound from './utils/resourceNotFound.mjs';

import blockchainRouter from './routes/blockchainRoutes.mjs';
import transactionRouter from './routes/transactionRoutes.mjs';

dotenv.config({ path: 'config/config.env' });

const credentials = {
  publishKey: process.env.PUBNUB_PUB_KEY,
  subscribeKey: process.env.PUBNUB_SUB_KEY,
  secretKey: process.env.PUBNUB_SEC_KEY,
  userId: process.env.PUBNUB_USER_ID,
};

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnub = new PubNubServer({
  blockchain,
  transactionPool,
  wallet,
  credentials,
});

const app = express();
app.use(express.json());

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/transactions', transactionRouter);
app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.argv[2] || process.env.DEFAULT_PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);

  // setTimeout(() => pubsub.broadcast('DEMO', { node: PORT }), 1000);
  // setTimeout(() => pubsub.broadcastBlockchain(), 1000);
});
