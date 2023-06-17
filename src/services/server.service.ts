import { Guild } from 'discord.js'

import { db } from '#/db'
import { Server } from '#/entity/server.entity'

import { config } from '#/constants'

const add = async (guild: Guild) => {
  const server = db.getRepository(Server).create({
    server_id: guild.id,
    prefix: config.PREFIX,
    active: true
  })

  return await db.getRepository(Server).save(server)
}

const get = async (guildId: string) => {
  return await db.getRepository(Server).findOne({
    where: { server_id: guildId }
  })
}

const has = async (guildId: string) => {
  const server = await get(guildId)
  return !!server
}

const validAndCreate = async (guild: Guild) => {
  const isAdd = await has(guild.id)
  if (!isAdd) {
    await add(guild)
  }
}

export const serverService = {
  add,
  get,
  has,
  validAndCreate
}
