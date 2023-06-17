import { CacheType, Message, ChatInputCommandInteraction } from 'discord.js'
import { serverService } from '@/services/server.service'

import { BotCommand } from '@/types/command'

const command: BotCommand = {
  name: 'test',
  description: 'Sirve para hacer tests',
  options: [
    {
      name: 'argumento1',
      description: 'Primer argumento',
      type: 3,
      required: true
    }
  ],

  execute: async (interaction: ChatInputCommandInteraction<CacheType> | Message, args: string[] | undefined) => {
    const arg = interaction instanceof ChatInputCommandInteraction
      ? interaction.options.getString('argumento1')
      : (args && args[0]) || '670071956204290078'

    const res = await serverService.get(arg || '')
    const res1 = await serverService.has(arg || '')

    console.log([res, res1])

    interaction.reply('Tests')
  }
}

export default command
