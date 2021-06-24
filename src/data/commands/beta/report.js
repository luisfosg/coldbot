import { getConfig, sendEmbed } from '../../util';

import language from '../../functions/language';

export default {
	name: 'report',
	alias: ['reportar'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.report.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.report.description,
	req: {
		minArgs: 2,
		cooldown: 60,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const lang = language( { guild: msg.guild } );
		const config = await getConfig();

		const guild = client.guilds.cache.get( config.reportsChannel[0] );
		const channel = guild.channels.cache.get( config.reportsChannel[1] );

		let text;

		if ( msg.guild ) {
			text = lang.report.inserver.replace(
				'{{ server }}', msg.guild.name
			).replace(
				'{{ serverId }}', msg.guild.id
			).replace(
				'{{ command }}', args[0]
			).replace(
				'{{ bug }}', args[1]
			);
		} else {
			text = lang.report.inmd.replace(
				'{{ command }}', args[0]
			).replace(
				'{{ bug }}', args[1]
			);
		}

		sendEmbed( {
			place: channel,
			text,
			author: [msg.author.username, msg.author.avatarURL( { dynamic: true } )],
			footer: [msg.author.id],
			timestamp: true
		} );

		sendEmbed( {
			place: msg.channel,
			text: lang.report.message.replace(
				'{{ user }}', msg.author
			),
			author: [client.user.username, client.user.avatarURL( { dynamic: true } )],
			timestamp: true
		} );
	},
};
