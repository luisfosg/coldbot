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
    console.log({ args })

    const command = args.shift()?.toLowerCase() || ''
    message.reply(`Has usado este comando: ${command}`)
  }
}

export default event
