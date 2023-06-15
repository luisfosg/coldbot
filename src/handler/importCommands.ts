import Table from 'cli-table3'
import fs from 'fs'

import { BotCommand } from '@/types/command'
import { ENV as env, commands, util } from '#/constants'

const table = new Table({
  chars: util.charsTable,
  style: { 'padding-left': 1, 'padding-right': 1 },
  head: ['LIST OF COMMANDS'],
  colWidths: [20]
})

export const importCommands = async (): Promise<BotCommand[]> => {
  const COMMANDS: BotCommand[] = []

  const commandFiles = await fs.promises.readdir(env.commandsFolderPath)

  for (const file of commandFiles) {
    if ((!file.endsWith('.ts') && !file.endsWith('.js')) && file.includes('.')) continue

    const filePath = new URL(util.getFilePath(`./commands/${file}`), import.meta.url).toString()
    const { default: commandModule } = await import(filePath)

    commands.set(commandModule.name, commandModule)
    table.push([commandModule.name])
    COMMANDS.push(commandModule)
  }

  console.log(table.toString())
  return COMMANDS
}
