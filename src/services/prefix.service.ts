import { serverService } from '@/services/server.service'
import { config } from '#/constants'

const get = async (guildId: string): Promise<string> => {
  const server = await serverService.get(guildId, {
    id: true,
    prefix: true
  })

  if (!server) {
    await serverService.add(guildId)
    return config.PREFIX
  }

  return server.prefix
}

const set = async (guildId: string, newPrefix: string): Promise<void> => {
  await serverService.edit(guildId, {
    prefix: newPrefix
  })
}

export const prefixService = {
  get,
  set
}
