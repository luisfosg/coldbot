import { ButtonInteraction, CacheType, ChatInputCommandInteraction, Events, Interaction } from 'discord.js'
import { BotEvent } from '@/types/event'

const interactionButton = async (interaction: ButtonInteraction<CacheType>) => {
  const { commands } = await import('../constants')
  const [commandName, customId] = interaction.customId.split('/')

  if (!commands.has(commandName)) return
  try {
    const command = commands.get(commandName)
    if (!command?.actions) return

    const action = command.actions.find(action => action.name === customId)
    if (!action) return

    await action.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply('An error occurred while executing the command.')
  }
}

const interactionChat = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const { commands } = await import('../constants')
  const commandName = interaction.commandName

  if (!commands.has(commandName)) return
  try {
    const command = commands.get(commandName)
    if (!command || !command.execute) return

    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply('An error occurred while executing the command.')
  }
}

const event: BotEvent = {
  name: Events.InteractionCreate,
  description: 'Se ejecuta cuando ocurra una interacción',
  execute: async (interaction: Interaction) => {
    if (interaction.isButton()) return interactionButton(interaction)
    if (interaction.isChatInputCommand()) return interactionChat(interaction)
  }
}

export default event
