import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

class Ping extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
    });
  }

  async exec(message: Message) {
    const sent = await message.util!.reply('Pong!');
    const timeDiff = (sent.editedAt?.valueOf() ?? sent.createdAt.valueOf()) - (message.editedAt?.valueOf() ?? message.createdAt.valueOf());
    return message.util!.reply([
      'Pong!',
      `🔂 **RTT**: ${timeDiff} ms`,
      `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
    ]);
  }
}

export default Ping;
