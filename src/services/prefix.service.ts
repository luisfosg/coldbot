import { db } from '#/db'
import { serverService } from '@/services/server.service'
import { Server } from '#/entity/server.entity'

const get = async (guildId: string): Promise<string> => {
  const server = await db.getRepository(Server).findOne({
    where: { server_id: guildId }
  })

  if (!server) {
    await serverService.add(guildId)
    return ''
  }

  return server.prefix
}

export const prefixService = {
  get
}
