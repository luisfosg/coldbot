import { Events, Message } from 'discord.js'

import { BotEvent } from '@/types/event'

const PREFIX = '!'

const event: BotEvent = {
  name: Events.MessageCreate,
  description: 'Se ejecuta al enviar un mensaje al servidor',
  execute: async (message: Message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    // Elimina el prefijo y obtén los argumentos del comando
    const args = message.content.slice(PREFIX.length).trim().split(/ +/)
    console.log({ args })

    const command = args.shift()?.toLowerCase() || ''

    message.reply(`Has usado este comando: ${command}`)
  }
}

export default event
