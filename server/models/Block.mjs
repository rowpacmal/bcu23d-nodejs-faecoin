import hexToBinary from 'hex-to-binary';
import { createHash } from '../utils/cryptoLib.mjs';

export default class Block {
  constructor({ index, timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.index = index;
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    return new this({
      index: 1,
      timestamp: 0,
      prevHash: '0',
      hash: '0',
      data: [],
      nonce: 0,
      difficulty: +process.env.DEFAULT_DIFFICULTY || 3,
    });
  }

  static mine({ prevBlock, data }) {
    const index = prevBlock.index + 1;
    const prevHash = prevBlock.hash;

    let { difficulty } = prevBlock;
    let timestamp, hash;
    let nonce = 1024;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficultyLevel(prevBlock, timestamp);
      hash = createHash(index, timestamp, prevHash, data, nonce, difficulty);
    } while (!hexToBinary(hash).startsWith('0'.repeat(difficulty)));

    return new this({
      index,
      timestamp,
      prevHash,
      hash,
      data,
      nonce,
      difficulty,
    });
  }

  static adjustDifficultyLevel(block, timestamp) {
    const { difficulty } = block;

    if (timestamp - block.timestamp > +process.env.DEFAULT_MINE_RATE) {
      return difficulty > 1 ? difficulty - 1 : difficulty;
    }

    return difficulty + 1;
  }
}
