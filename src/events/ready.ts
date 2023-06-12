import { Events } from 'discord.js'

import { client } from '#/server'
import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.ClientReady,
  description: 'Execute when is ready Bot!!',
  once: true,
  execute: async () => {
    if(!client.user) return

    console.log(`Logged in as ${client.user.tag}!`)
  },
};

export default event
