import { REST, Routes } from 'discord.js'

import { importCommands } from '#/handler/importCommands'
import { InteractionCommand, BotCommand } from '@/types/command'

export const refreshCommands = async (token: string, clientId: string) => {
  const rest = new REST({ version: '10' }).setToken(token)

  let COMMANDS: BotCommand[] = await importCommands()
  COMMANDS = COMMANDS.filter(command => !command.onlyPrefix)

  const interactionCommands: InteractionCommand[] = COMMANDS.map(command => ({
    name: command.name,
    description: command.description,
    options: command.options || []
  }))

  try {
    await rest.put(Routes.applicationCommands(clientId), { body: interactionCommands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
