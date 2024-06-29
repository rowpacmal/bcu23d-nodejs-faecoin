import express from 'express';
import { mongoDB, security, startup, synchronize } from './startup.mjs';

// import logHandler from './middlewares/logHandler.mjs';
import errorHandler from './middlewares/errorHandler.mjs';
import mainRouter from './routes/mainRoutes.mjs';
import resourceNotFound from './utils/resourceNotFound.mjs';

startup();
mongoDB();

const app = express();
app.use(express.json());

security(app);

// app.use(logHandler);

app.use('/api/v1', mainRouter);
app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.argv[2] || process.env.DEFAULT_PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);

  if (PORT !== process.env.DEFAULT_PORT) synchronize();
});
