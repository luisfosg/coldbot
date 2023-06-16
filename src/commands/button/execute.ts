import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, EmbedBuilder, Message } from 'discord.js'

export const ButtonCommand = async (
  interaction: ChatInputCommandInteraction<CacheType> | Message,
  args: string[]
) => {
  const argumento1 = interaction instanceof ChatInputCommandInteraction
    ? interaction.options.getString('argumento1')
    : args[0] || 'test'

  const confirm = new ButtonBuilder()
    .setCustomId('button/confirm')
    .setLabel('Confirm')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('🫣')

  const cancel = new ButtonBuilder()
    .setCustomId('button/cancel')
    .setLabel('Cancel')
    .setEmoji('🥵')
    .setStyle(ButtonStyle.Secondary)

  const row: any = new ActionRowBuilder().addComponents(cancel, confirm)

  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription(argumento1)
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true }
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

  await interaction.reply({ embeds: [exampleEmbed], content: 'Texto!!!', components: [row] })
}
