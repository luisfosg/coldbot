import { client } from '#/server'
import { commands } from '@/utils/importCommands'
import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from 'discord.js'

const interactionButton = async (interaction: ButtonInteraction<CacheType>) => {
  const [commandName, customId] = interaction.customId.split('/');

  if (!commands.has(commandName)) return;
  try {
    const command = commands.get(commandName);
    if (!command?.actions) return

    const action = command.actions.find(action => action.name === customId)
    if (!action) return

    await action.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('An error occurred while executing the command.');
  }
}

const interactionChat = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const commandName = interaction.commandName

  if (!commands.has(commandName)) return;
  try {
    const command = commands.get(commandName);
    if(!command || !command.execute) return;

    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('An error occurred while executing the command.');
  }
}

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) return interactionButton(interaction);
  if (interaction.isChatInputCommand()) return interactionChat(interaction)
})
