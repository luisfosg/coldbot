import { MessageEmbed } from 'discord.js';

import { sendMsg, getConfig } from '../../util';

import language from '../../functions/language';

export default {
	name: 'botinfo',
	alias: ['bot'],
	category: 'bot',
	usage: ( langs ) => langs.commands.usage,
	description: ( langs ) => langs.commands.description,
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

		embed.setTitle( lang.botinfo.title );
		embed.setThumbnail( client.user.avatarURL() );
		embed.setDescription( lang.botinfo.description );
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
			lang.botinfo.titleBot, `
			============
			🏓 **Ping**: \`${Math.round( client.ws.ping )}ms\`
			⌨ **Comandos**: \`${ client.commands.size }\`
			🎉 **Eventos**: \`${ client.eventCount }\`
			🕹 **Discord.js**: \`${ config.discordV }\`
			🇳 **NodeJS**: \`${ config.nodeV }\`
			`, true
		);
		embed.setFooter( `👾 ${ config.botV }` );

		sendMsg( msg, embed );
	},
};
