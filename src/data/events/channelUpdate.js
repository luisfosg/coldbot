import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/hooks';

import { color } from '../util';
import language from '../functions/language';

export default {
	name: 'channelUpdate',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, oldChannel, newChannel ) => {
		const lang = language( client, oldChannel.guild );

		if ( !oldChannel.guild ) return;

		const embed = new MessageEmbed();

		embed.setTitle( lang.channelUpdate.title );
		embed.setColor( color() );
		if ( oldChannel.name === newChannel.name ) {
			embed.setDescription( lang.channelUpdate.settings.replace(
				'{{ channel }}', newChannel.name
			).replace(
				'{{ id }}', oldChannel.id
			) );
		} else {
			embed.setDescription( lang.channelUpdate.nameEdited.replace(
				'{{ oldName }}', oldChannel.name
			).replace(
				'{{ newName }}', newChannel.name
			).replace(
				'{{ id }}', oldChannel.id
			) );
		}
		embed.setTimestamp();
		embed.setFooter( oldChannel.guild.name, oldChannel.guild.iconURL() );

		sendLog( embed );
	},
};
