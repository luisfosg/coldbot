import { client } from './server'
import { commands } from './importCommands'

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return
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
})
