import express from 'express';
import dotenv from 'dotenv';

import resourceNotFound from './utils/resourceNotFound.mjs';
import errorHandler from './middlewares/errorHandler.mjs';

dotenv.config({ path: 'config/config.env' });

const app = express();
app.use(express.json());

app.all('*', resourceNotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
