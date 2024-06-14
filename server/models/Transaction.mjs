import { v4 as uuidv4 } from 'uuid';
import { verifySignature } from '../utils/cryptoLib.mjs';
import ErrorResponse from './ErrorResponse.mjs';

export default class Transaction {
  constructor({ sender, recipient, amount, inputMap, outputMap }) {
    this.id = uuidv4().replaceAll('-', '');
    this.outputMap =
      outputMap || this.createOutputMap({ sender, recipient, amount });
    this.inputMap =
      inputMap || this.createInputMap({ sender, outputMap: this.outputMap });
  }

  createInputMap({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }

  createOutputMap({ sender, recipient, amount }) {
    return {
      [recipient]: amount,
      [sender.publicKey]: sender.balance - amount,
    };
  }

  static transactionReward({ miner }) {
    return new this({
      inputMap: process.env.DEFAULT_REWARD_ADDRESS,
      outputMap: { [miner.publicKey]: +process.env.DEFAULT_MINING_REWARD },
    });
  }

  update({ sender, recipient, amount }) {
    if (amount > this.outputMap[sender.publicKey])
      throw new ErrorResponse('Not enough funds', 400);

    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] += amount;
    }

    this.outputMap[sender.publicKey] -= amount;

    this.inputMap = this.createInputMap({ sender, outputMap: this.outputMap });
  }

  static validate(transaction) {
    const {
      inputMap: { address, amount, signature },
      outputMap,
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, amount) => total + amount
    );

    if (amount !== outputTotal) return false;
    if (!verifySignature({ publicKey: address, data: outputMap, signature }))
      return false;

    return true;
  }
}
