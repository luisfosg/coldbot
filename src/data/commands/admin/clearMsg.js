import { sendLog } from '../../web/hooks';

import { sendMsg } from '../../util';
import language from '../../functions/language';

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

const sendMsgClear = ( lang, msg, number ) => {
	sendLog( lang.clear.message.replace(
		'{{ user }}', msg.member.user.id
	).replace(
		'{{ number }}', number
	).replace(
		'{{ channel }}', msg.channel.id
	) );
};

const clearMsg = async ( lang, msg, number ) => {
	await msg.channel.bulkDelete( number + 1 ).then( ( msgDeleted ) => {
		sendMsgClear( lang, msg, msgDeleted.size );
	} );
};

export default {
	name: 'clear',
	alias: ['cls'],
	category: 'admin',
	usage: ( langs, p ) => langs.clear.usage.replace( /{{ p }}/g, p ),
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
		} else if ( number > 3 || number < 0 ) {
			msg.delete().catch( () => {} );
			return sendMsg( msg, lang.clear.error );
		}

		await clearMsg( lang, msg, number );
	},
};
