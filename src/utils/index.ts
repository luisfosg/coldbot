import { Message } from 'discord.js'

import { client } from '#/server'
import { PrefixFun } from '@/types/util'

import { config } from '#/constants'

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

const getPrefix = (message: Message): PrefixFun => {
  let isPrefix = false
  let args: string[] = []

  const botMentions = [config.PREFIX, `<@${client?.user?.id}>`, `<!@${client?.user?.id}>`]
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
