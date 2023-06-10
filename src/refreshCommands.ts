import { REST, Routes } from 'discord.js'

const COMMANDS = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

export const refreshCommands = async (token: string, clientId: string) => {
  const rest = new REST({ version: '10' }).setToken(token)

  try {
    await rest.put(Routes.applicationCommands(clientId), { body: COMMANDS })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
