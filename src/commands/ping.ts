import { BotCommand } from '#types/command'

const command: BotCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  execute: (interaction) => {
    interaction.reply('Aquí hacemos Pong!');
  },
};

export default command
