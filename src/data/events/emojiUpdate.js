import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/hooks';

import language from '../functions/language';

export default {
	name: 'emojiUpdate',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, oldEmoji, newEmoji ) => {
		const lang = language( client, oldEmoji.guild );

		const embed = new MessageEmbed();

		embed.setTitle( lang.emojiUpdate.title );
		embed.setColor( 'RED' );
		embed.setTimestamp();
		embed.setDescription( lang.emojiUpdate.description.replace(
			'{{ oldName }}', oldEmoji.name
		).replace(
			'{{ newName }}', newEmoji.name
		) );
		embed.setFooter( oldEmoji.guild.name, oldEmoji.guild.iconURL() );

		sendLog( embed );
	},
};
