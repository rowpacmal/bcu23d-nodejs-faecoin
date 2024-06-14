import express from 'express';
import { getAllBlocks } from '../controllers/blockchainController.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getAllBlocks);

export default blockchainRouter;
