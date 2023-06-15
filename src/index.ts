import { ENV as env } from '#/constants'

import { client } from '#/server'
import { db } from '#/db'

import { refreshCommands } from '#/handler/refreshCommands'
import { importEvents } from '#/handler/importEvents'

const initDiscordBot = async () => {
  await refreshCommands(env.token, env.clientId)
  await importEvents()

  client.login(env.token)
}

db.initialize()
  .then(() => console.log('Database has been initialized!'))
  .catch((err) => console.error('Error DB: ', err))

initDiscordBot().catch(async (err) => {
  console.error('Error Discord:', err)
  process.exit(1)
})
