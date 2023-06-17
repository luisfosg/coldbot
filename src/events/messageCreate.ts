import { Events, Message, PermissionFlagsBits } from 'discord.js'

import { util } from '#/constants'
import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.MessageCreate,
  description: 'Se ejecuta al enviar un mensaje al servidor',
  permissions: [PermissionFlagsBits.SendMessages],
  execute: async (message: Message) => {
    const { isPrefix, args } = await util.getPrefix(message)
    if (!isPrefix) return

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
