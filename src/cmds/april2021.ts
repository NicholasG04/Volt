import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

class April2020 extends Command {
  db: low.LowdbSync<any>;

  constructor() {
    super('april2021', {
      aliases: ['april2021'],
      args: [
        {
          id: 'action',
          type: 'string',
          default: '',
        },
      ],
      clientPermissions: ['CHANGE_NICKNAME'],
      channel: 'guild',
    });

    const adapter = new FileSync('storage/april2021.json');
    this.db = low(adapter);

    this.db.defaults({ servers: [] })
      .write();
  }

  // @ts-ignore
  userPermissions(message: Message) {
    if (!message.member!.roles.cache.some((role) => role.name === 'Admins')) return 'Admins';
    return null;
  }

  async exec(message: Message, args: any) {
    if (!args.action) return message.util!.reply('Please specify an action. Valid actions are `start`, `pause` and `revert`');
    switch (args.action) {
      case 'start':
        message.util!.reply('Powering up April Fools 2020');

        return message.util!.reply('April Fools 2020 is successfully initialised');
      case 'pause':
        return message.util!.reply('Pausing changing nicknames but NOT reverting old ones');
      case 'revert':
        return message.util!.reply('Reverting old nicknames');
      default:
        return message.util!.reply('Invalid action. Valid actions are `start`, `pause` and `revert`');
    }
  }
}

export default April2020;
