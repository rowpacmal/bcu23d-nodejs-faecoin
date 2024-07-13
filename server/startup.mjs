import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import PubNubServer from './models/PubNubServer.mjs';

export let blockchain, transactionPool, wallet, pubnub;

export const mongoDB = async () => {
  const mongo = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected to ${mongo.connection.host}`);
};

export const security = (app) => {
  const limit = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 1000,
  });

  app.use(helmet());
  app.use(xss());
  app.use(limit);
  app.use(cors());
  app.use(hpp());
};

export const startup = () => {
  dotenv.config({ path: 'config/config.env' });
  global.__rootdirname = path.dirname(fileURLToPath(import.meta.url));

  const credentials = {
    publishKey: process.env.PUBNUB_PUB_KEY,
    subscribeKey: process.env.PUBNUB_SUB_KEY,
    secretKey: process.env.PUBNUB_SEC_KEY,
    userId: process.env.PUBNUB_USER_ID,
  };

  blockchain = new Blockchain();
  transactionPool = new TransactionPool();
  wallet = new Wallet();
  pubnub = new PubNubServer({
    blockchain,
    transactionPool,
    wallet,
    credentials,
  });
};

export const synchronize = async () => {
  const responseBlockchain = await fetch(
    `${process.env.DEFAULT_NODE}/api/v1/blockchain`
  );
  if (responseBlockchain.ok) {
    const result = await responseBlockchain.json();
    blockchain.updateChain(result.data);
  }

  const responseTransactions = await fetch(
    `${process.env.DEFAULT_NODE}/api/v1/transactions`
  );
  if (responseTransactions.ok) {
    const result = await responseTransactions.json();
    transactionPool.updateTransactionMap(result.data);
  }
};
