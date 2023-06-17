import { db } from '#/db'
import { Server } from '#/entity/server.entity'

const get = async (guildId: string): Promise<string> => {
  const server = await db.getRepository(Server).findOne({
    where: { server_id: guildId }
  })

  if (!server) return ''
  return server.prefix
}

export const prefixService = {
  get
}
