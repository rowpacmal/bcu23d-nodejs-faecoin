import express from 'express';
import { startup } from './startup.mjs';

import errorHandler from './middlewares/errorHandler.mjs';
import resourceNotFound from './utils/resourceNotFound.mjs';

import blockchainRouter from './routes/blockchainRoutes.mjs';
import transactionRouter from './routes/transactionRoutes.mjs';
import FileHandler from './models/FileHandler.mjs';

startup();

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
