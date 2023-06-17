import { Guild } from 'discord.js'

import { db } from '#/db'
import { Server } from '#/entity/server.entity'

import { config } from '#/constants'
import { ServerType } from '@/types/util'

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

const getAll = async () => {
  return await db.getRepository(Server).find()
}

const edit = async (guildId: string, guild: ServerType) => {
  const server = await get(guildId)
  if (!server) return

  await db.getRepository(Server).save({
    ...server,
    ...guild
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
  } else {
    await edit(guild.id, {
      active: true
    })
  }
}

export const serverService = {
  add,
  get,
  getAll,
  edit,
  has,
  validAndCreate
}
