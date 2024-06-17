import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import PubNubServer from './models/PubNubServer.mjs';

export let blockchain, transactionPool, wallet, pubnub;

const createInstance = async (Prototype) => {
  let instance = await Prototype.findOne();

  if (!instance) {
    instance = await Prototype.create({});
  }

  return instance;
};

export const startup = async () => {
  dotenv.config({ path: 'config/config.env' });
  global.__rootdirname = path.dirname(fileURLToPath(import.meta.url));

  const mongo = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`MongoDB connected to ${mongo.connection.host}`);

  const credentials = {
    publishKey: process.env.PUBNUB_PUB_KEY,
    subscribeKey: process.env.PUBNUB_SUB_KEY,
    secretKey: process.env.PUBNUB_SEC_KEY,
    userId: process.env.PUBNUB_USER_ID,
  };

  blockchain = await createInstance(Blockchain);
  transactionPool = new TransactionPool();
  wallet = new Wallet();
  pubnub = new PubNubServer({
    blockchain,
    transactionPool,
    wallet,
    credentials,
  });
};
