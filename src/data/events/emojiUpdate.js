import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/logshook';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, oldEmoji, newEmoji ) => {
		const embed = new MessageEmbed();

		embed.setTitle( '**[Emoji Editado]**' );
		embed.setColor( 'RED' );
		embed.setTimestamp();
		embed.setDescription( `Emoji **${oldEmoji.name}** fue actualizado a **${newEmoji.name}**` );
		embed.setFooter( oldEmoji.guild.name, oldEmoji.guild.iconURL() );

		sendLog( embed );
	},
};
