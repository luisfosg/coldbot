import { sendMsg } from '../../util';

import { getSplit, setSplit } from '../../../db/splitString';

import language from '../../functions/language';

export default {
	name: 'setsplit',
	alias: ['split', 'string'],
	category: 'bot',
	usage: ( langs ) => langs.split.usage,
	description: ( langs ) => langs.split.description,
	req: {
		args: 2,
		dm: false,
		cooldown: 0,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		const lang = language( client, msg.guild );

		let estado = false;
		args[0] = args[0].toLowerCase();

		const split = await getSplit( msg );

		if ( args[1] === '' ) {
			args[1] = split.value;
		}

		if ( args[0] === 'true' ) {
			estado = true;
			setSplit( msg, true, args[1] );
		} else {
			setSplit( msg, false, args[1] );
		}

		sendMsg( msg, lang.split.message.replace( '{{ split }}', args[1] ) );
		if ( estado ) {
			sendMsg( msg, lang.split.activated );
		} else {
			sendMsg( msg, lang.split.disabled );
		}
	},
};
