import { serverService } from '@/services/server.service'

import { BotCommand } from '@/types/command'

const command: BotCommand = {
  name: 'test',
  description: 'Sirve para hacer tests',
  execute: async (interaction) => {
    const res1 = await serverService.getAll()

    console.log(res1)
    interaction.reply('Tests')
  }
}

export default command
