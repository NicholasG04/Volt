import { Command } from 'discord-akairo';
import type { Message } from 'discord.js';

export default class EvalCommand extends Command {
  public constructor() {
    super('eval', {
      aliases: ['eval'],
      ownerOnly: true,
      args: [
        {
          id: 'input',
          match: 'rest',
          type: 'string',
        },
      ],
    });
  }

  public async exec(message: Message, { input }: { input: string }): Promise<Message | Message[] | Promise<Message | Message[]>[]> {
    function clean(text: string) {
      if (typeof text === 'string') return text.replace(/`/g, `'\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
      return text;
    }

    const code = input
      .replace(/(%E2%80%98|%E2%80%99)(%E2%80%98|%E2%80%99)/g, '`')
      .replace(/%E2%80%99|%E2%80%98/g, "'")
      .replace(/%E2%80%9C|%E2%80%9D/g, '"')
      .replace(/\\'/g, '\'');
    try {
      // eslint-disable-next-line no-eval
      const evaled = await eval(code);
      if (!clean(input).startsWith('wrappedPromise')) {
        if (code.length > 3000) return message.util!.send('ERROR: Response exceeds limit');
        return message.util!.send(`:inbox_tray: **Input**\n${input}\n:outbox_tray: **Output**\n\`\`\`js\n${clean(evaled)}\`\`\``);
      }
    } catch (err) {
      return message.util!.send(`:inbox_tray: **Input**\n${input}\n\n\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

    return message.util!.send('Error');
  }
}
