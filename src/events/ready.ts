import { client } from '#/server'

client.on('ready', () => {
  if(!client.user) return

  console.log(`Logged in as ${client.user.tag}!`)
})
