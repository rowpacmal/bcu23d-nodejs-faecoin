import { it, describe, expect, beforeEach } from 'vitest';
import {
  testDefaultMiningReward,
  testDefaultRewardAddress,
} from '../config/testConfig.mjs';

import { verifySignature } from '../utils/cryptoLib.mjs';
import Transaction from '../models/Transaction.mjs';
import Wallet from '../models/Wallet.mjs';

describe('Transaction()', () => {
  let sender, recipient, amount, transaction;

  beforeEach(() => {
    sender = new Wallet();
    recipient = 'Michael';
    amount = 50;
    transaction = new Transaction({ sender, recipient, amount });
  });

  describe('Properties:', () => {
    it('- should have an id', () => {
      expect(transaction).toHaveProperty('id');
    });

    it('- should have an outputMap', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('- should have an inputMap', () => {
      expect(transaction).toHaveProperty('inputMap');
    });
  });

  describe('OutputMap:', () => {
    it('- should contain recipients received amount', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it('- should contain senders active balance (after transaction)', () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    });
  });

  describe('inputMapMap:', () => {
    it('- should have a timestamp', () => {
      expect(transaction.inputMap).haveOwnProperty('timestamp');
    });

    it('- should contain senders current balance (before transaction)', () => {
      expect(transaction.inputMap.amount).toEqual(sender.balance);
    });

    it('- should contain senders public key', () => {
      expect(transaction.inputMap.address).toEqual(sender.publicKey);
    });

    describe('- should contain a signature:', () => {
      it('-- and its verified', () => {
        expect(
          verifySignature({
            publicKey: sender.publicKey,
            data: transaction.outputMap,
            signature: transaction.inputMap.signature,
          })
        ).toEqual(true);
      });
    });
  });

  describe('Validate Transaction:', () => {
    describe('- when valid:', () => {
      it('-- should return true', () => {
        expect(Transaction.validate(transaction)).toEqual(true);
      });
    });

    describe('- when invalid:', () => {
      describe('-- outputMap value is invalid:', () => {
        it('--- should return false', () => {
          transaction.outputMap[sender.publicKey] = 69;

          expect(Transaction.validate(transaction)).toEqual(false);
        });
      });

      describe('-- inputMap signature is invalid:', () => {
        it('--- should return false', () => {
          transaction.inputMap.signature = new Wallet().sign(69);

          expect(Transaction.validate(transaction)).toEqual(false);
        });
      });
    });
  });

  describe('Update Transaction:', () => {
    describe('- amount is valid:', () => {
      let originalSignature, prevSenderOutput, newRecipient, newAmount;

      beforeEach(() => {
        originalSignature = transaction.inputMap.signature;
        prevSenderOutput = transaction.outputMap[sender.publicKey];
        newRecipient = 'Lina';
        newAmount = 100;

        transaction.update({
          sender,
          recipient: newRecipient,
          amount: newAmount,
        });
      });

      it('-- should contain a new recipients received amount', () => {
        expect(transaction.outputMap[newRecipient]).toEqual(newAmount);
      });

      it('-- should contain senders updated active balance (after transaction)', () => {
        expect(transaction.outputMap[sender.publicKey]).toEqual(
          prevSenderOutput - newAmount
        );
      });

      it('-- should contain a total output amount equal to the input amount', () => {
        expect(
          Object.values(transaction.outputMap).reduce(
            (total, amount) => total + amount
          )
        ).toEqual(transaction.inputMap.amount);
      });

      it('-- should contain an updated transaction signature', () => {
        expect(transaction.inputMap.signature).not.toEqual(originalSignature);
      });
    });

    describe('- amount is invalid (not enough funds):', () => {
      it('-- should throw an error', () => {
        expect(() => {
          transaction.update({ sender, recipient, amount: 1010 });
        }).toThrow('Not enough funds');
      });
    });
  });

  describe('Transaction Reward:', () => {
    let rewardTransaction, miner;

    beforeEach(() => {
      miner = new Wallet();
      rewardTransaction = Transaction.transactionReward(miner);
    });

    it('- should create a new transaction, containing the default reward address ', () => {
      expect(rewardTransaction.inputMap.address).toEqual(
        testDefaultRewardAddress
      );
    });

    it('- should contain only ONE transaction to the miner with the default mining reward', () => {
      expect(rewardTransaction.outputMap[miner.publicKey]).toEqual(
        testDefaultMiningReward
      );
    });
  });
});
