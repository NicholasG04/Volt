import { Listener } from 'discord-akairo';

class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    // eslint-disable-next-line no-console
    console.log('I\'m ready!');
  }
}

export default Ready;
