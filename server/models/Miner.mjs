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

    this.blockchain.addBlock({
      data: validTransactions,
      miner: {
        address: this.wallet.publicKey,
        reward: +process.env.DEFAULT_MINING_REWARD,
      },
    });
    this.pubnub.broadcastBlockchain();

    if (!(await Chain.findOne())) {
      await Chain.create(this.blockchain);
    } else {
      await Chain.findOneAndUpdate({}, this.blockchain);
    }

    this.transactionPool.clearAllTransactions();

    const rewardTransaction = Transaction.transactionReward(this.wallet);

    this.transactionPool.addTransaction(rewardTransaction);
    this.pubnub.broadcastTransaction(rewardTransaction);
  }
}
