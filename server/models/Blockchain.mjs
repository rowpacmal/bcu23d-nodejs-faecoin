import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  addBlock(data) {
    const block = Block.mine({ prevBlock: this.chain.at(-1), data });

    this.chain.push(block);

    return block;
  }
}
