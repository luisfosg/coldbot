import { MessageEmbed } from 'discord.js';

import { color } from '../../util';

import language from '../../functions/language';

export default {
	name: 'serverinfo',
	alias: ['server'],
	category: 'general',
	usage: ( langs, p ) => langs.server.usage.replace( /{{ p }}/g, p ),
	description: ( langs ) => langs.server.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		const lang = language( client, msg.guild );
		const server = msg.guild;

		const embed = new MessageEmbed();
		embed.setThumbnail( server.iconURL() );
		embed.setAuthor( server.name, server.iconURL );
		embed.addField( lang.server.id, server.id, true );
		embed.addField( lang.server.region, server.region, true );
		embed.addField( lang.server.date, server.joinedAt.toLocaleDateString(), true );
		embed.addField( lang.server.owner, `${ server.owner.user.username }#${ server.owner.user.discriminator }`, true );
		embed.addField( lang.server.members, server.memberCount, true );
		embed.setColor( color() );

		msg.channel.send( embed );
	},
};
