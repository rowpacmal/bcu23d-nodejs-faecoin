import PubNub from 'pubnub';

export default class PubNubServer {
  #publishKey;
  #subscribeKey;
  #secretKey;
  #userId;
  #channels;
  #server;

  constructor({ blockchain, transactionPool, wallet, credentials, channels }) {
    const { publishKey, subscribeKey, secretKey, userId } = credentials;

    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;

    this.#publishKey = publishKey;
    this.#subscribeKey = subscribeKey;
    this.#secretKey = secretKey;
    this.#userId = userId;
    this.#channels = channels;

    this.#init();
    this.#addListener();
  }

  #init() {
    try {
      this.#server = new PubNub({
        publishKey: this.#publishKey,
        subscribeKey: this.#subscribeKey,
        secretKey: this.#secretKey,
        userId: this.#userId,
      });

      if (Object.keys(this.#channels).length > 0) {
        this.#server.subscribe({ channels: Object.values(this.#channels) });
      }
    } catch (error) {
      console.error('Failed to initialize PubNub:', error.message);
    }
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

  broadcast() {}

  async publish(channel, message) {
    try {
      const selectedChannel = this.#channels[channel];

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
}
