import { sendMsg } from '../util';

import { getSplit, setSplit } from '../../db/splitString';

export default {
	name: 'split',
	alias: ['spl', 'string'],
	description: '',
	req: {
		args: 2,
		enable: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, args ) => {
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
			setSplit( msg, true, args[1] );
		}

		sendMsg( msg, `Cambiando el Separador de Argumentos a \`${ args[1] }\`` );
		if ( !estado ) {
			sendMsg( msg, 'Se ha desactivado el Separador de Argumentos' );
		} else {
			sendMsg( msg, 'El Separador de Argumentos Esta Activo.' );
		}
	},
};
