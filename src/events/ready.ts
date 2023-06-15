import { Client, Events } from 'discord.js'
import chalk from 'chalk'

import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.ClientReady,
  description: 'Execute when is ready Bot!!',
  once: true,
  execute: async (client: Client) => {
    if (!client.user) return

    console.log(`Logged in as ${chalk.bgCyan(client.user.tag)}!`)
  }
}

export default event
