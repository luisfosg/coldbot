import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

export const refreshCommands = async () => {
  const rest = new REST({ version: '10' }).setToken('MTExNzE2NDIxNTk0NjQ2NTMyMA.G72IJm.j_SYoX8TtXb-Bi7Q1-zm5HL8EwwcMlR1L5Iy1Q');

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands('1117164215946465320'), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};
