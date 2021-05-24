import { sendLog } from '../../web/hooks';

import { sendMsg } from '../../util';

import language from '../../functions/language';

const sendMsgClear = ( lang, msg, number ) => {
	sendLog( lang.clear.message.replace(
		'{{ user }}', msg.member.user.id
	).replace(
		'{{ number }}', number
	).replace(
		'{{ channel }}', msg.channel.id
	) );
};

const parseTxtNumber = ( num ) => {
	let number;
	try {
		number = parseInt( num, 10 );
		if ( !number ) {
			number = 1;
		}
	} catch ( e ) {
		number = 1;
	}
	return number;
};

export default {
	name: 'clear',
	alias: ['cls'],
	category: 'admin',
	usage: ( langs ) => langs.clear.usage,
	description: ( langs ) => langs.clear.description,
	req: {
		minArgs: 1,
		cooldown: 60,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
		const lang = language( client, msg.guild );

		const number = parseTxtNumber( args[0] );

		if ( msg.member.hasPermission( 'ADMINISTRATOR' ) ) {
			if ( number < 0 || number > 99 ) {
				msg.delete().catch( () => {} );
				return sendMsg( msg, lang.clear.errorAdmin );
			}
			msg.channel.bulkDelete( number + 1 );
			sendMsgClear( lang, msg, number );
		} else {
			if ( number > 3 || number < 0 ) {
				msg.delete().catch( () => {} );
				return sendMsg( msg, lang.clear.error );
			}
			msg.channel.bulkDelete( number + 1 );
			sendMsgClear( lang, msg, number );
		}
	},
};
