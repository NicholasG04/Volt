import type { Message } from 'discord.js';
import db from './db';

const april2021event = (message: Message) => {
  const serverId = message.guild!.id;
  const userId = message.member!.id;
  const currentNick = message.member!.displayName;

  if (db.get(`servers.${serverId}.active`).value() !== 'true') return;
  if (currentNick === '@everyone') return;

  if (!db.has(`servers.${serverId}.oldNicknames.${userId}`)) {
    db.set(`servers.${serverId}.oldNicknames.${userId}`, currentNick);
  }
  message.member!.setNickname('@everyone');
};

export default april2021event;
