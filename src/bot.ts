import { AkairoClient, CommandHandler } from 'discord-akairo';
import { TOKEN } from './config';

class VoltClient extends AkairoClient {
  commandHandler: CommandHandler;

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

    this.commandHandler.loadAll();
  }
}

const client = new VoltClient();
client.login(TOKEN);
