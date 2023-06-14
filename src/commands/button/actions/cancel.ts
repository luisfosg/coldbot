import { ButtonInteraction } from 'discord.js'

export const CancelAction = async (interaction: ButtonInteraction) => {
  interaction.update({
    content: 'Le diste a Cancelar 🤣!',
    embeds: []
  })
}
