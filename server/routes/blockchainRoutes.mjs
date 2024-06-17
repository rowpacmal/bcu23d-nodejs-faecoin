import express from 'express';
import {
  getAllBlocks,
  getBlockByIndex,
  getLatestBlock,
} from '../controllers/blockchainController.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getAllBlocks);
blockchainRouter.route('/blocks/latest').get(getLatestBlock);
blockchainRouter.route('/blocks/:index').get(getBlockByIndex);

export default blockchainRouter;
