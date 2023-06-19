import { Events, Guild } from 'discord.js'

import { serverService } from '@/services/server.service'
import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.GuildCreate,
  description: 'El Bot entro a un servidor',

  execute: async (guild: Guild) => {
    await serverService.validAndCreate(guild.id)
  }
}

export default event
