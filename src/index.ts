import dotenv from 'dotenv'
import { ENV } from '#/constants'

import { client } from '#/server'
import { refreshCommands } from '#/handler/refreshCommands'
import { importEvents } from '#/handler/importEvents'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const initDiscordBot = async () => {
  const env = ENV()

  await refreshCommands(env.token, env.clientId)
  await importEvents()

  client.login(env.token)
}

initDiscordBot().catch((error) => {
  console.error('Ocurrió un error:', error)
  process.exit(1)
})
