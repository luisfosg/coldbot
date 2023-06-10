import { Client, GatewayIntentBits } from 'discord.js';

import { refreshCommands } from './interaction'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  if(!client.user) return;
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login('MTExNzE2NDIxNTk0NjQ2NTMyMA.G72IJm.j_SYoX8TtXb-Bi7Q1-zm5HL8EwwcMlR1L5Iy1Q');
refreshCommands();
