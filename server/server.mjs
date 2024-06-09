import express from 'express';
import dotenv from 'dotenv';

import resourceNotFound from './utils/resourceNotFound.mjs';
import errorHandler from './middlewares/errorHandler.mjs';
import PubNubServer from './pubnub.mjs';

dotenv.config({ path: 'config/config.env' });

const credentials = {
  publishKey: process.env.PUBNUB_PUB_KEY,
  subscribeKey: process.env.PUBNUB_SUB_KEY,
  secretKey: process.env.PUBNUB_SEC_KEY,
  userId: process.env.PUBNUB_USER_ID,
  channel: 'faecoin',
};

const pubsub = new PubNubServer({ credentials });
pubsub.start();

const app = express();
app.use(express.json());

app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.argv[2] || process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);

  setTimeout(() => pubsub.publish(`Hej from ${PORT}`), 1000);
});
