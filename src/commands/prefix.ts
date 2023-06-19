import { prefixService } from '@/services/prefix.service'

import { BotCommand } from '@/types/command'
import { CacheType, ChatInputCommandInteraction, Message } from 'discord.js'

const command: BotCommand = {
  name: 'prefix',
  description: 'Sirve para cambiar el prefix',
  onlyPrefix: true,
  options: [
    {
      name: 'argumento1',
      description: 'Primer argumento',
      type: 3,
      required: true
    }
  ],

  execute: async (
    interaction: ChatInputCommandInteraction<CacheType> | Message,
    args: string[] | undefined
  ) => {
    const arg1 = interaction instanceof ChatInputCommandInteraction
      ? interaction.options.getString('argumento1')
      : (args && args[0]) || '>'

    await prefixService.set(interaction.guildId || '', arg1 || '>')
    interaction.reply(`Se cambio el prefix a: ${arg1}`)
  }
}

export default command
