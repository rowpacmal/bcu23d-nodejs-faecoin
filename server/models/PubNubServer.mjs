import PubNub from 'pubnub';
import defaultChannels from '../utils/defaultChannels.mjs';

export default class PubNubServer {
  #publishKey;
  #subscribeKey;
  #secretKey;
  #userId;
  #server;

  constructor({ blockchain, transactionPool, wallet, channels, credentials }) {
    const { publishKey, subscribeKey, secretKey, userId } = credentials;

    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.channels = channels || defaultChannels;

    this.#publishKey = publishKey;
    this.#subscribeKey = subscribeKey;
    this.#secretKey = secretKey;
    this.#userId = userId;

    this.#validateCredentials();
    this.#initializeServer();
    this.#addListener();
  }

  #addListener() {
    this.#server.addListener({
      message: (messageObject) => {
        const { channel, message } = messageObject;

        try {
          const parsedMessage = JSON.parse(message);

          console.log(
            `Channel: ${channel}\nRaw message: ${message}\nParsed message:`,
            parsedMessage
          );
        } catch (error) {
          console.error('Failed to parse message:', error.message);
        }
      },
    });
  }

  #initializeServer() {
    try {
      this.#server = new PubNub({
        publishKey: this.#publishKey,
        subscribeKey: this.#subscribeKey,
        secretKey: this.#secretKey,
        userId: this.#userId,
      });

      if (Object.keys(this.channels).length > 0) {
        this.#server.subscribe({ channels: Object.values(this.channels) });
      }
    } catch (error) {
      console.error('Failed to initialize PubNub:', error.message);
    }
  }

  #validateCredentials() {
    if (
      !this.#publishKey ||
      !this.#subscribeKey ||
      !this.#secretKey ||
      !this.#userId
    ) {
      throw new Error('All PubNub credentials must be provided.');
    }
  }

  async #publish({ channel, message }) {
    try {
      const selectedChannel = this.channels[channel];

      if (!selectedChannel) {
        throw new Error(`Channel ${channel} is not defined.`);
      }

      await this.#server.publish({
        channel: selectedChannel,
        message:
          typeof message === 'string' ? message : JSON.stringify(message),
      });
    } catch (error) {
      console.error('Failed to publish message:', error.message);
    }
  }

  broadcast(channel, message) {
    this.#publish({ channel, message });
  }

  broadcastBlockchain() {
    this.#publish({ channel: 'BLOCKCHAIN', message: this.blockchain });
  }

  broadcastTransaction(transaction) {
    this.#publish({ channel: 'TRANSACTION', message: transaction });
  }
}
