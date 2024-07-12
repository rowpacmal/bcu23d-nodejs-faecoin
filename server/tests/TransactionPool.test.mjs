import { it, describe, expect, beforeEach } from 'vitest';
import { testDefaultMiningReward } from '../config/testConfig.mjs';

import Blockchain from '../models/Blockchain.mjs';
import Transaction from '../models/Transaction.mjs';
import TransactionPool from '../models/TransactionPool.mjs';
import Wallet from '../models/Wallet.mjs';

describe('TransactionPool()', () => {
  let sender, transaction, transactionPool;
  sender = new Wallet();

  beforeEach(() => {
    transaction = new Transaction({ sender, recipient: 'Michael', amount: 50 });
    transactionPool = new TransactionPool();
  });

  describe('Properties:', () => {
    it('- should have an transactionMap', () => {
      expect(transactionPool).toHaveProperty('transactionMap');
    });
  });

  describe('Add Transaction:', () => {
    it('- should add a transaction to the pool', () => {
      transactionPool.addTransaction(transaction);

      expect(transactionPool.transactionMap[transaction.id]).toEqual(
        transaction
      );
    });
  });

  describe('Transaction Exist:', () => {
    it('- should return a transaction when using a valid address', () => {
      transactionPool.addTransaction(transaction);

      expect(transactionPool.transactionExist(sender.publicKey)).toEqual(
        transaction
      );
    });

    it('- should return undefined when using an invalid address', () => {
      transactionPool.addTransaction(transaction);

      expect(transactionPool.transactionExist(new Wallet().publicKey)).toEqual(
        undefined
      );
    });
  });

  describe('Validate Transactions:', () => {
    let validTransactions;

    beforeEach(() => {
      validTransactions = [];

      for (let i = 0; i < 20; i++) {
        transaction = new Transaction({
          sender,
          recipient: 'Lina',
          amount: 25,
        });

        if (i % 4 === 0) {
          transaction.inputMap.amount = 1010;
        } else if (i % 4 === 1) {
          transaction.outputMap['Lina'] = 69;
        } else if (i % 4 === 2) {
          transaction.inputMap.signature = new Wallet().sign(69);
        } else {
          validTransactions.push(transaction);
        }

        transactionPool.addTransaction(transaction);
      }
    });

    it('- should return valid transactions', () => {
      expect(transactionPool.validateTransactions()).toStrictEqual(
        validTransactions
      );
    });
  });

  describe('Update Transaction Map:', () => {
    it('- should return updated transactions', () => {
      const newTransactionPool = new TransactionPool();

      newTransactionPool.addTransaction(
        new Transaction({ sender, recipient: 'Sebastian', amount: 100 })
      );

      const newTransactionMap = newTransactionPool.transactionMap;

      transactionPool.updateTransactionMap(newTransactionMap);

      expect(transactionPool.transactionMap).toEqual(newTransactionMap);
    });
  });

  describe('Clear All Transaction:', () => {
    it('- should clear all transactions from the transaction pool', () => {
      transactionPool.clearAllTransactions();
      expect(transactionPool.transactionMap).toEqual({});
    });
  });

  describe('Clear Block Transactions:', () => {
    it('should clear existing transactions on the blockchain from the transaction pool', () => {
      const blockchain = new Blockchain();
      const expectedTransactionMap = {};

      for (let i = 0; i < 20; i++) {
        const transaction = new Wallet().createTransaction({
          recipient: 'Jenny',
          amount: 75,
        });

        transactionPool.addTransaction(transaction);

        if (i % 2 === 0) {
          blockchain.addBlock({
            data: [transaction],
            miner: {
              address: new Wallet().publicKey,
              reward: testDefaultMiningReward,
            },
          });
        } else {
          expectedTransactionMap[transaction.id] = transaction;
        }
      }

      transactionPool.clearBlockTransactions(blockchain.chain);

      expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);
    });
  });
});
