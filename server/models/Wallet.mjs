import ErrorResponse from './ErrorResponse.mjs';
import { createHash, ellipticHash } from '../utils/cryptoLib.mjs';
import Currency from './Currency.mjs';

export default class Wallet {
  constructor() {
    this.balance = new Currency(+process.env.DEFAULT_BALANCE);
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) throw new ErrorResponse('Not enough funds', 400);

    return new Transaction({ sender: this, recipient, amount });
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }
}
