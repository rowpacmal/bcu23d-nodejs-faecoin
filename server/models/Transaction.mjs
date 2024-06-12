import { v4 as uuidv4 } from 'uuid';

import { createHash } from '../utils/cryptoLib.mjs';
import Currency from './Currency.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount, outputMap, inputMap }) {
    this.index = uuidv4().replaceAll('-', '');
    this.outputMap =
      outputMap ||
      this.createOutputMap({
        sender,
        recipient,
        payload: new Currency(amount),
      });
    this.inputMap =
      inputMap || this.createInputMap({ sender, outputMap: this.outputMap });
  }

  createOutputMap({ sender, recipient, payload }) {
    sender.balance.amount -= payload.amount;

    return {
      [recipient]: payload,
      [sender.publicKey]: sender.balance,
    };
  }

  createInputMap({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }
}
