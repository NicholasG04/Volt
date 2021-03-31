import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class April2020 extends Command {
  constructor() {
    super('april2020', {
      aliases: ['april2020'],
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
        return message.util!.reply('Powering up April Fools 2020');
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
