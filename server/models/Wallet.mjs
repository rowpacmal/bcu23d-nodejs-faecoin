import { createHash, ellipticHash } from '../utils/cryptoLib.mjs';
import Transaction from './Transaction.mjs';
import ErrorResponse from './ErrorResponse.mjs';

export default class Wallet {
  constructor() {
    this.balance = +process.env.DEFAULT_BALANCE;
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = this.constructor.calculateBalance({
        chain,
        address: this.publicKey,
      });
    }

    if (amount > this.balance) throw new ErrorResponse('Not enough funds', 400);

    return new Transaction({ sender: this, recipient, amount });
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  static calculateBalance({ chain, address }) {
    let total = 0;
    let hasAddedTransaction = false;

    for (let i = chain.length - 1; i > 0; i--) {
      const block = chain[i];

      for (let transaction of block.data) {
        if (transaction.inputMap.address === address)
          hasAddedTransaction = true;

        const value = transaction.outputMap[address];

        if (value) total += value;
      }

      if (hasAddedTransaction) break;
    }

    return hasAddedTransaction ? total : +process.env.DEFAULT_BALANCE + total;
  }
}
