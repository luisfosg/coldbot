import { BotCommand } from '#types/command'

const command: BotCommand = {
  name: 'ping',
  description: 'Replies with Pong!',
  options: [],
  execute: async (interaction) => {
    interaction.reply('Pong!');
  },
};

export default command
