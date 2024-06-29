import PubNub from 'pubnub';

export default class PubNubServer {
  constructor({ blockchain, transactionPool, wallet, credentials }) {
    const { publishKey, subscribeKey, secretKey, userId } = credentials;

    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.channels = {
      DEMO: 'DEMO',
      BLOCKCHAIN: 'BLOCKCHAIN',
      TRANSACTIONS: 'TRANSACTIONS',
    };

    this.publishKey = publishKey;
    this.subscribeKey = subscribeKey;
    this.secretKey = secretKey;
    this.userId = userId;

    this.initializeServer();
    this.addListener();
  }

  addListener() {
    this.server.addListener({
      message: (messageObject) => {
        const { channel, message } = messageObject;

        try {
          const parsedMessage = JSON.parse(message);

          console.log(
            `Channel: ${channel}\nRaw message: ${message}\nParsed message:`,
            parsedMessage
          );

          switch (channel) {
            case this.channels.BLOCKCHAIN:
              this.blockchain.updateChain(parsedMessage, true, () => {
                this.transactionPool.clearBlockTransactions(parsedMessage);
              });
              break;

            case this.channels.TRANSACTIONS:
              if (
                !this.transactionPool.transactionExist(this.wallet.publicKey)
              ) {
                this.transactionPool.addTransaction(parsedMessage);
              }
              break;

            default:
              return;
          }
        } catch (error) {
          console.error('Failed to parse message:', error.message);
        }
      },
    });
  }

  initializeServer() {
    if (
      !this.publishKey ||
      !this.subscribeKey ||
      !this.secretKey ||
      !this.userId
    ) {
      throw new Error('All PubNub credentials must be provided.');
    }

    try {
      this.server = new PubNub({
        publishKey: this.publishKey,
        subscribeKey: this.subscribeKey,
        secretKey: this.secretKey,
        userId: this.userId,
      });

      if (Object.keys(this.channels).length > 0) {
        this.server.subscribe({ channels: Object.values(this.channels) });
      }
    } catch (error) {
      console.error('Failed to initialize PubNub:', error.message);
    }
  }

  async publish({ channel, message }) {
    try {
      const selectedChannel = this.channels[channel];

      if (!selectedChannel) {
        throw new Error(`Channel ${channel} is not defined.`);
      }

      await this.server.publish({
        channel: selectedChannel,
        message:
          typeof message === 'string' ? message : JSON.stringify(message),
      });
    } catch (error) {
      console.error('Failed to publish message:', error.message);
    }
  }

  broadcast(channel, message) {
    this.publish({ channel, message });
  }

  broadcastBlockchain() {
    this.publish({
      channel: this.channels.BLOCKCHAIN,
      message: this.blockchain,
    });
  }

  broadcastTransaction(transaction) {
    this.publish({ channel: this.channels.TRANSACTIONS, message: transaction });
  }
}
