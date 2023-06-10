import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { BotCommand } from '#types/command'

const command: BotCommand = {
  name: 'button',
  description: 'Replies with Button',
  options: [
    {
      name: 'argumento1',
      description: 'Primer argumento',
      type: 3,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const argumento1 = interaction.options.getString('argumento1');

    const confirm = new ButtonBuilder()
      .setCustomId('primary')
      .setLabel('Primary')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('🫣');

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cancel')
      .setEmoji('🥵')
			.setStyle(ButtonStyle.Secondary);

		const row: any = new ActionRowBuilder().addComponents(cancel, confirm);

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
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
      .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    await interaction.reply({ embeds: [exampleEmbed], content: 'Texto!!!', components: [row] });
  },
};

export default command
