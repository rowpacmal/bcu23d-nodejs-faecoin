import express from 'express';
import { startup } from './startup.mjs';

// import logHandler from './middlewares/logHandler.mjs';
import errorHandler from './middlewares/errorHandler.mjs';
import mainRouter from './routes/mainRoutes.mjs';
import resourceNotFound from './utils/resourceNotFound.mjs';

startup();

const app = express();
app.use(express.json());
// app.use(logHandler);

app.use('/api/v1', mainRouter);
app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.argv[2] || process.env.DEFAULT_PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);

  // setTimeout(() => pubsub.broadcast('DEMO', { node: PORT }), 1000);
  // setTimeout(() => pubsub.broadcastBlockchain(), 1000);
});
