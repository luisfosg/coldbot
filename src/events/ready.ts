import { Client, Events } from 'discord.js'
import chalk from 'chalk'

import { db } from '#/db'
import { User } from '#/entity/user.entity'

import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.ClientReady,
  description: 'Execute when is ready Bot!!',
  once: true,
  execute: async (client: Client) => {
    if (!client.user) return

    console.log(`Logged in as ${chalk.bgCyan(client.user.tag)}!`)

    const user = db.getRepository(User).create({
      firstName: 'Luis',
      lastName: 'Test'
    })

    const results = await db.getRepository(User).save(user)
    console.log({ results })
  }
}

export default event
