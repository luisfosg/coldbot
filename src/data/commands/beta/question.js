import { sendEmbed } from '../../util';

import language from '../../functions/language';

let lang;

export default {
	name: 'question',
	alias: ['q'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.meme.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.meme.description,
	req: {
		minArgs: 1,
		cooldown: 5,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( _client, msg, args ) => {
		lang = language( { guild: msg.guild } );

		const embed = sendEmbed( {
			title: 'Encuesta',
			text: args[0],
			returnEmbed: true
		} );

		msg.channel.send( embed ).then( ( msgEmbed ) => {
			msgEmbed.react( '👍' );
			msgEmbed.react( '👎' );
		} );
	},
};
