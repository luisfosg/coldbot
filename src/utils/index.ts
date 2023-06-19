import { Message } from 'discord.js'

import { client } from '#/server'
import { PrefixFun } from '@/types/util'

const charsTable = {
  top: '═',
  'top-mid': '╤',
  'top-left': '╔',
  'top-right': '╗',
  bottom: '═',
  'bottom-mid': '╧',
  'bottom-left': '╚',
  'bottom-right': '╝',
  left: '║',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '║',
  'right-mid': '',
  middle: '│'
}

const getFilePath = (file: string) => {
  if (!file.endsWith('.js') && !file.endsWith('.ts')) return file + '/index.js'
  return file
}

const getPrefix = async (message: Message): Promise<PrefixFun> => {
  const { prefixService } = await import('@/services/prefix.service')
  const prefix: string = await prefixService.get(message.guildId || '')

  let isPrefix = false
  let args: string[] = []

  const botMentions = [prefix, `<@${client?.user?.id}>`, `<!@${client?.user?.id}>`]
  const msg = message.content

  botMentions.forEach(mention => {
    if (msg.startsWith(mention)) {
      isPrefix = true
      args = msg.slice(mention.length).trim().split(/ +/)
    }
  })

  return {
    isPrefix,
    args
  }
}

export default {
  charsTable,
  getFilePath,
  getPrefix
}
