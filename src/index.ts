import dotenv from 'dotenv';
import { ENV } from '#/constants'
dotenv.config();

import { client } from '#/server'
import { refreshCommands } from '#/refreshCommands'
import { importEvents } from '@/utils/importEvents'

const initDiscordBot = async () => {
  const env = ENV()

  await refreshCommands(env.token, env.clientId)
  await importEvents()

  client.login(env.token)
}

initDiscordBot().catch((error) => {
  console.error('Ocurrió un error:', error);
  process.exit(1);
});
