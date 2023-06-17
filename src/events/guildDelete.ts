import { Events, Guild } from 'discord.js'

import { serverService } from '@/services/server.service'
import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.GuildDelete,
  description: 'El Bot salio de un servidor',

  execute: async (guild: Guild) => {
    await serverService.edit(guild.id, {
      active: false
    })
  }
}

export default event
