import { sendMsg } from '../../util';
import { setLanguage, getLanguage } from '../../../db/language';

export default {
	name: 'setlanguage',
	alias: ['setlang', 'lang'],
	category: 'beta',
	usage: 'no',
	description: 'no',
	req: {
		args: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		if ( !args[0] ) {
			return sendMsg( msg, `El lenguaje seleccionado es \`${ await getLanguage( msg ) }\`` );
		}

		args[0] = args[0].toUpperCase();

		if ( !client.languages.has( args[0] ) ) return sendMsg( msg, 'Idioma no Disponible' );

		setLanguage( msg, args[0] );
		sendMsg( msg, `Idioma Actualizado a \`${ args[0] }\`` );
	},
};
