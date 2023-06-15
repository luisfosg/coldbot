import dotenv from 'dotenv'
import { Collection } from 'discord.js'
import { dirname, resolve } from 'path'
import { URL, fileURLToPath } from 'url'

import { BotCommand } from '@/types/command'
import { BotEvent } from '@/types/event'

import utils from '@/utils/index'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const moduleURL = new URL(import.meta.url)
const __dirname = dirname(fileURLToPath(moduleURL))

export const ENV = {
  token: process.env.TOKEN_BOT || '',
  clientId: process.env.CLIENT_ID || '',

  typeDB: process.env.DB_PROVIDER || 'sqlite',
  DB_NAME: process.env.DB_NAME || 'dev.db',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: process.env.DB_PORT || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',

  commandsFolderPath: resolve(__dirname, './commands'),
  eventsFolderPath: resolve(__dirname, './events')
}

export const commands = new Collection<string, BotCommand>()
export const events = new Collection<string, BotEvent>()

export const util = {
  ...utils
}
