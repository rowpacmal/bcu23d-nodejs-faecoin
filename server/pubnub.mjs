import PubNub from 'pubnub';

export default class PubNubServer {
  #publishKey;
  #subscribeKey;
  #secretKey;
  #userId;
  #channels;
  #server;

  constructor({ credentials, channels }) {
    const { publishKey, subscribeKey, secretKey, userId } = credentials;

    this.#publishKey = publishKey;
    this.#subscribeKey = subscribeKey;
    this.#secretKey = secretKey;
    this.#userId = userId;
    this.#channels = channels;

    this.#init();
  }

  #init() {
    try {
      this.#server = new PubNub({
        publishKey: this.#publishKey,
        subscribeKey: this.#subscribeKey,
        secretKey: this.#secretKey,
        userId: this.#userId,
      });

      this.#server.subscribe({ channels: Object.values(this.#channels) });

      this.#server.addListener({
        message: (msgObject) => {
          const { channel, message } = msgObject;

          try {
            const msg = JSON.parse(message);
            console.log('Parsed message:', msg);

            console.log(`Channel: ${channel}, Raw message: ${message}`);
          } catch (error) {
            console.error('Failed to parse message:', error.message);
          }
        },
      });
    } catch (error) {
      console.error('Failed to initialize PubNub:', error);
    }
  }

  async publish(channel, message) {
    try {
      const selectedChannel = this.#channels[channel];

      if (!selectedChannel) {
        throw new Error(`Channel ${channel} is not defined.`);
      }

      await this.#server.publish({
        channel: selectedChannel,
        message: message || '',
      });
    } catch (error) {
      console.error('Failed to publish message:', error);
    }
  }
}
