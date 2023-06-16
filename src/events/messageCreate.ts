import { Events, Message, PermissionFlagsBits } from 'discord.js'

import { BotEvent } from '@/types/event'

const PREFIX = '!'

const event: BotEvent = {
  name: Events.MessageCreate,
  description: 'Se ejecuta al enviar un mensaje al servidor',
  permissions: [PermissionFlagsBits.SendMessages],
  execute: async (message: Message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return

    // Elimina el prefijo y obtén los argumentos del comando
    const args = message.content.slice(PREFIX.length).trim().split(/ +/)

    const commandName = args.shift()?.toLowerCase() || ''
    const { commands } = await import('../constants')

    if (!commands.has(commandName)) return
    try {
      const command = commands.get(commandName)
      if (!command || !command.execute) return

      await command.execute(message, args)
    } catch (error) {
      console.error(error)
      await message.reply(`An error occurred while executing the command: ${commandName}`)
    }
  }
}

export default event
