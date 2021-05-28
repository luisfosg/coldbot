import { sendLog } from '../../web/hooks';

import { sendMsg } from '../../util';
import language from '../../functions/language';

const parseTxtNumber = ( num ) => {
	let number;
	try {
		number = parseInt( num, 10 );
		if ( !number ) {
			number = 0;
		}
	} catch ( e ) {
		number = 0;
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
		sendMsgClear( lang, msg, msgDeleted.size - 1 );
	} );
};

export default {
	name: 'clear',
	alias: ['cls'],
	category: 'admin',
	usage: ( langs, p, s ) => langs.clear.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.clear.description,
	req: {
		minArgs: 1,
		cooldown: 2,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['MANAGE_MESSAGES'],
		necessary: ['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY']
	},
	run: async ( client, msg, args ) => {
		const lang = language( client, msg.guild );

		const number = parseTxtNumber( args[0] );
		if ( number < 0 || number > 99 ) {
			msg.delete().catch( () => {} );
			return sendMsg( msg, lang.clear.error );
		}

		await clearMsg( lang, msg, number );
	},
};
