import mongoose from 'mongoose';

import { createHash } from '../utils/cryptoLib.mjs';
import Block from './Block.mjs';

const blockchainSchema = new mongoose.Schema({
  chain: { type: [Object], required: true, default: [Block.genesis] },
});

blockchainSchema.methods.addBlock = function ({ data }) {
  const block = Block.mine({ prevBlock: this.chain.at(-1), data });

  this.chain.push(block);

  return block;
};

blockchainSchema.methods.updateChain = function (chain) {
  if (chain.length <= this.chain.length) return;
  if (!this.constructor.validateChain(chain)) return;

  this.chain = chain;
};

blockchainSchema.statics.validateChain = function (chain) {
  if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis))
    return false;

  for (let i = 1; i < chain.length; i++) {
    const { index, timestamp, prevHash, hash, data, nonce, difficulty } =
      chain.at(i);
    const { hash: lastHash, difficulty: lastDifficulty } = chain.at(i - 1);
    const validHash = createHash(
      index,
      timestamp,
      prevHash,
      data,
      nonce,
      difficulty
    );

    if (hash !== validHash) return false;
    if (prevHash !== lastHash) return false;
    if (Math.abs(lastDifficulty - difficulty) > 1) return false;
  }

  return true;
};

export default mongoose.model('Blockchain', blockchainSchema);
