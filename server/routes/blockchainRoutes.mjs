import express from 'express';
import {
  getAllBlocks,
  mineBlock,
} from '../controllers/blockchainController.mjs';

const blockchainRouter = express.Router();

blockchainRouter.get('/', getAllBlocks);
blockchainRouter.post('/mine', mineBlock);

export default blockchainRouter;
