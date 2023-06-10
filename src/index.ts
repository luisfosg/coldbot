import dotenv from 'dotenv'
dotenv.config()

import { ENV } from './constants'

import { client } from './server'
import { refreshCommands } from './refreshCommands'
import './interactions'

refreshCommands(ENV.token, ENV.clientId)
client.login(ENV.token)
