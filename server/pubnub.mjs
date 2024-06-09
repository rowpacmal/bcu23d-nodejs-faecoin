import PubNub from 'pubnub';

export default class PubNubServer {
  #publishKey;
  #subscribeKey;
  #secretKey;
  #userId;
  #channel;
  #server;

  constructor({ credentials }) {
    const { publishKey, subscribeKey, secretKey, userId } = credentials;

    this.#publishKey = publishKey;
    this.#subscribeKey = subscribeKey;
    this.#secretKey = secretKey;
    this.#userId = userId;
    this.#channel = {
      DEMO: 'demo',
      BLOCKCHAIN: 'blockchain',
      TRANSACTIONS: 'transactions',
    };

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
    } catch (error) {
      console.error('Failed to initialize PubNub:', error);
    }
  }

  start() {
    try {
      const channel = this.#server.channel(this.#channel.DEMO);
      const subscription = channel.subscription();

      this.#server.addListener({
        status: (statusEvent) => {
          console.log('Status:', statusEvent.category);
        },
      });

      subscription.onMessage = (messageEvent) => {
        const msg = messageEvent.message;
        console.log('Message:', msg);
      };

      subscription.subscribe();
    } catch (error) {
      console.error('Failed to start PubNub server:', error);
    }
  }

  async publish(channel, message) {
    try {
      const selectedChannel = this.#channel[channel];

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
