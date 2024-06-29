import Chain from './Chain.mjs';
import Transaction from './Transaction.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubnub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubnub = pubnub;
  }

  async mineTransaction() {
    const validTransactions = this.transactionPool.validateTransactions();
    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );

    this.blockchain.addBlock(validTransactions);

    if (!(await Chain.findOne())) {
      await Chain.create(this.blockchain);
    } else {
      await Chain.findOneAndUpdate({}, this.blockchain);
    }

    this.transactionPool.clearAllTransactions();
  }
}
