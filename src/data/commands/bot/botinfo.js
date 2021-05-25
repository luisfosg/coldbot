/* eslint-disable newline-per-chained-call */
import { MessageEmbed } from 'discord.js';

import { sendMsg, getConfig, color } from '../../util';

import language from '../../functions/language';

export default {
	name: 'botinfo',
	alias: ['bot'],
	category: 'bot',
	usage: ( langs, p ) => langs.botinfo.usage.replace( /{{ p }}/g, p ),
	description: ( langs ) => langs.botinfo.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		const lang = language( client, msg.guild );
		const config = await getConfig();

		const embed = new MessageEmbed();

		embed.setColor( color() );
		embed.setTitle( lang.botinfo.title );
		embed.setThumbnail( client.user.avatarURL() );
		embed.setDescription( lang.botinfo.descriptionBot );
		embed.addField(
			lang.botinfo.titleGeneral, lang.botinfo.fieldGeneral.replace(
				'{{ dev }}', config.devs[0][0]
			).replace(
				'{{ servers }}', client.guilds.cache.size
			).replace(
				'{{ users }}', client.users.cache.size
			).replace(
				'{{ channels }}', client.channels.cache.size
			), true
		);
		embed.addField(
			lang.botinfo.titleBot, lang.botinfo.fieldBot.replace(
				'{{ ping }}', Math.round( client.ws.ping )
			).replace(
				'{{ commands }}', client.commands.size
			).replace(
				'{{ events }}', client.eventCount
			).replace(
				'{{ discordV }}', config.discordV
			).replace(
				'{{ nodeV }}', config.nodeV
			), true
		);
		embed.setFooter( `👾 ${ config.botV }` );

		sendMsg( msg, embed );
	},
};
