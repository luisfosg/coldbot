import dotenv from 'dotenv';
import { ENV } from '#/constants'
dotenv.config();

import { client } from '#/server'
import { refreshCommands } from '#/refreshCommands'

const initDiscordBot = async () => {
  const env = ENV()

  refreshCommands(env.token, env.clientId)
  client.login(env.token)
}

initDiscordBot()
