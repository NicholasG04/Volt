import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import type low from 'lowdb';
import db from '../util/db';

interface OldNicknames {
  [key: string]: string;
}

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

    this.db = db;
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
        message.util!.reply('Powering up April Fools 2021');
        this.db.set(`servers.${message.guild!.id}.active`, true).write();
        return message.util!.reply('April Fools 2021 is successfully initialised');
      case 'pause':
        message.util!.reply('Pausing changing nicknames but NOT reverting old ones');
        this.db.set(`servers.${message.guild!.id}.active`, false).write();
        return message.util!.reply('Paused successfully');
      case 'revert':
        message.util!.reply('Reverting old nicknames');
        // eslint-disable-next-line no-case-declarations
        const oldNicknames: OldNicknames = this.db.get(`servers.${message.guild!.id}.oldNicknames`).value();
        message.util!.send(JSON.stringify(oldNicknames));
        for (const [id, name] of Object.entries(oldNicknames)) {
          const user = message.guild!.member(id)
          user!.setNickname(name, 'Revert April Fools').catch(e => console.log(`No perms for user ${user!.user.username}`))
        }
        return message.util!.reply('Old nicknames successfully reverted');
      default:
        return message.util!.reply('Invalid action. Valid actions are `start`, `pause` and `revert`');
    }
  }
}

export default April2020;
