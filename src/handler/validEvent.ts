import { client } from '#/server'
import { BotEvent } from '@/types/event'

export const validEvent = (args: any[], event: BotEvent): any => {
  if (args[0].author?.bot) return

  const permChannel = args[0].channel?.permissionsFor(client?.user?.id || '')
  if (!permChannel && !event.permissions) return event.execute(...args)

  const validations = event.permissions?.map(permission => permChannel.has(permission))
  if (validations?.includes(false)) return

  event.execute(...args)
}
