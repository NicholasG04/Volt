import { Listener } from 'discord-akairo';
import type { Message } from 'discord.js';
import april2021event from '../util/april2021event';

class MessageListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message',
    });
  }

  exec(message: Message) {
    april2021event(message);
  }
}

export default MessageListener;
