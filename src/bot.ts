import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { TOKEN } from './config';

class VoltClient extends AkairoClient {
  commandHandler: CommandHandler;

  listenerHandler: ListenerHandler;

  constructor() {
    super({
      ownerID: '159744245517778945',
    }, {
      disableMentions: 'everyone',
    });

    this.commandHandler = new CommandHandler(this, {
      directory: './src/cmds/',
      prefix: '%',
      commandUtil: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './src/listeners/',
    });

    this.commandHandler.loadAll();

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.loadAll();
  }
}

const client = new VoltClient();
client.login(TOKEN);
