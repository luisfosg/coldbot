import { ButtonInteraction } from 'discord.js'

export const ConfirmAction = async (interaction: ButtonInteraction) => {
  interaction.update({
    content: 'Le diste a Confirmar 🤨!',
    embeds: []
  })
}
