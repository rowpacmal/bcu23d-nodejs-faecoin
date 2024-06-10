import genesisBlock from '../utils/genesisBlock.mjs';

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
}
