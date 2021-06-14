import figlet from 'figlet';

import { sendEmbed } from '../../util';
import language from '../../functions/language';

export default {
	name: 'ascii',
	alias: ['art'],
	category: 'general',
	usage: ( langs, p, s ) => langs.ascii.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.ascii.description,
	req: {
		minArgs: 1,
		cooldown: 10,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( _client, msg, args ) => {
		const lang = language( { guild: msg.guild } );

		figlet( args[0], {
			width: 60,
			whitespaceBreak: false
		}, ( err, txt ) => {
			if ( err ) {
				sendEmbed( {
					place: msg.channel,
					text: lang.ascii.error
				} );
			}

			sendEmbed( {
				place: msg.channel,
				text: `\`\`\`${txt}\`\`\``
			} );
		} );
	},
};
