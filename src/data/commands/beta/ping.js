import { sendEmbed } from '../../util';

import language from '../../functions/language';

export default {
	name: 'ping',
	alias: ['pong'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.ping.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.ping.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, _args ) => {
		const lang = language( { guild: msg.guild } );

		const embed = sendEmbed( {
			text: 'Preparando terreno....',
			returnEmbed: true
		} );

		msg.channel.send( embed ).then( ( msgPing ) => {
			const embedPing = sendEmbed( {
				title: 'Pong!! 🏓',
				text: `🔹 Latency is \`${msgPing.createdTimestamp - msg.createdTimestamp}\` ms.\n🔹 API Latency is \`${Math.round( client.ws.ping )}\` ms`,
				timestamp: true,
				returnEmbed: true
			} );
			msgPing.edit( embedPing );
		} );
	},
};
