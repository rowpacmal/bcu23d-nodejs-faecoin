import express from 'express';
import dotenv from 'dotenv';

import Blockchain from './models/Blockchain.mjs';
import PubNubServer from './models/PubNubServer.mjs';

import resourceNotFound from './utils/resourceNotFound.mjs';
import errorHandler from './middlewares/errorHandler.mjs';

dotenv.config({ path: 'config/config.env' });

const blockchain = new Blockchain();
const credentials = {
  publishKey: process.env.PUBNUB_PUB_KEY,
  subscribeKey: process.env.PUBNUB_SUB_KEY,
  secretKey: process.env.PUBNUB_SEC_KEY,
  userId: process.env.PUBNUB_USER_ID,
};

const pubsub = new PubNubServer({ blockchain, credentials });

const app = express();
app.use(express.json());

app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.argv[2] || process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);

  // setTimeout(() => pubsub.broadcast('DEMO', { node: PORT }), 1000);
  setTimeout(() => pubsub.broadcastBlockchain(), 1000);
});
