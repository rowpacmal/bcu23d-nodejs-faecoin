import PubNub from 'pubnub';

export default class PubNubServer {
  constructor({ publishKey, subscribeKey, secretKey, userId }) {
    this.channel = 'hello_world';
    this.server = new PubNub({
      publishKey,
      subscribeKey,
      secretKey,
      userId,
    });
  }

  start() {
    const channel = this.server.channel(this.channel);
    const subscription = channel.subscription();

    this.server.addListener({
      status: (statusEvent) => {
        console.log('Status', statusEvent.category);
      },
    });

    subscription.onMessage = (messageEvent) => {
      this.showMessage(messageEvent.message.description);
    };

    subscription.subscribe();
  }

  async publishMessage(message) {
    await this.server.publish({
      channel: this.channel,
      message: {
        title: 'greeting',
        description: message,
      },
    });
  }

  showMessage(msg) {
    console.log('Message: ' + msg);
  }
}
