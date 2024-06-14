import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import PubNubServer from './models/PubNubServer.mjs';

export let blockchain, transactionPool, wallet, pubnub;

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
