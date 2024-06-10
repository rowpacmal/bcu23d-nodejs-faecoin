import hexToBinary from 'hex-to-binary';

import { createHash } from '../utils/cryptoLib.mjs';
import genesisBlock from '../utils/genesisBlock.mjs';
import adjustDifficultyLevel from '../utils/adjustDifficultyLevel.mjs';

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
    return new this(genesisBlock);
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
      difficulty = adjustDifficultyLevel(prevBlock, timestamp);
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
}
