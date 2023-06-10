import { REST, Routes } from 'discord.js';
import { ENV } from './constants'

const COMMANDS = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const refreshCommands = async () => {
  const rest = new REST({ version: '10' }).setToken(ENV.token);

  try {
    await rest.put(Routes.applicationCommands(ENV.clientId), { body: COMMANDS });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

refreshCommands()
