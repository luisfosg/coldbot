import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/hooks';

import { color } from '../util';
import language from '../functions/language';

export default {
	name: 'channelPinsUpdate',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, channel, _time ) => {
		const lang = language( client, channel.guild );
		const { id, name } = channel;

		const embed = new MessageEmbed();
		embed.setTitle( lang.pinsUpdate.title );
		embed.setColor( color() );
		embed.setDescription( lang.pinsUpdate.description.replace(
			'{{ id }}', id
		) );
		embed.setTimestamp();
		embed.setFooter( name, channel.guild.iconURL() );

		sendLog( embed );
	},
};
