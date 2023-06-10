import { Client, GatewayIntentBits } from 'discord.js'

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', () => {
  if(!client.user) return

  console.log(`Logged in as ${client.user.tag}!`)
})
