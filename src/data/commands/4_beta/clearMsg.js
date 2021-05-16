import { sendLog } from '../../web/hooks';

import { sendMsg } from '../../util';

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
	category: 'beta',
	usage: ( langs ) => langs.clear.usage,
	description: ( langs ) => langs.clear.description,
	req: {
		args: 1,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( _client, msg, args ) => {
		const number = parseTxtNumber( args[0] );

		if ( msg.member.hasPermission( 'ADMINISTRATOR' ) ) {
			if ( number < 0 || number > 99 ) {
				msg.delete().catch( () => {} );
				return sendMsg( msg, 'No puede Colocar numeros negativos o Eliminar mas de 99 mensajes' );
			}
			msg.channel.bulkDelete( number + 1 );
			sendLog( `<@${ msg.member.user.id }> Elimino \`${ number }\` mensajes de <#${ msg.channel.id }>` );
		} else {
			if ( number > 3 || number < 0 ) {
				msg.delete().catch( () => {} );
				return sendMsg( msg, 'No puede Borrar mas de 3 mensajes o colocar numeros negativos' );
			}
			msg.channel.bulkDelete( number + 1 );
			sendLog( `<@${ msg.member.user.id }> Elimino \`${ number }\` mensajes de <#${ msg.channel.id }>` );
		}
	},
};
