import Blockchain from './Blockchain.mjs';
import Transaction from './Transaction.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubsub }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubsub = pubsub;
  }

  async mineTransaction() {
    const validTransactions = this.transactionPool.validateTransactions();
    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );
    this.blockchain.addBlock({ data: validTransactions });
    await Blockchain.findOneAndUpdate({}, this.blockchain);
    // this.pubsub.broadcast();
    this.transactionPool.clearTransactions();
  }
}
