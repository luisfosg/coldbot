import { Client, GatewayIntentBits } from 'discord.js';
import { ENV } from './constants'

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

client.login(ENV.token);
