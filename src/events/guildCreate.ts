import { Events, Guild } from 'discord.js'

import { db } from '#/db'
import { Server } from '#/entity/server.entity'

import { BotEvent } from '@/types/event'
import { config } from '#/constants'

const event: BotEvent = {
  name: Events.GuildCreate,
  description: 'El Bot entro a un nuevo servidor',
  execute: async (guild: Guild) => {
    const server = db.getRepository(Server).create({
      server_id: guild.id,
      prefix: config.PREFIX,
      active: true
    })

    const results = await db.getRepository(Server).save(server)
    console.log({ results })
  }
}

export default event
