import { Events } from 'discord.js'

import { BotEvent } from '@/types/event'

const event: BotEvent = {
  name: Events.ClientReady,
  description: 'Execute when is ready Bot!!',
  once: true,
  execute: async (client) => {
    if(!client.user) return

    console.log(`Logged in as ${client.user.tag}!`)
  },
};

export default event
