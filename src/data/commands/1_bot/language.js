import { sendMsg } from '../../util';
import { setLanguage, getLanguage } from '../../../db/language';
import { setLanguageUtil } from '../../functions/language';

export default {
	name: 'setlanguage',
	alias: ['setlang', 'lang'],
	category: 'beta',
	usage: 'no',
	description: 'no',
	req: {
		args: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		if ( !args[0] ) {
			return sendMsg( msg, `El lenguaje seleccionado es \`${ await getLanguage( msg.guild.id ) }\`` );
		}

		args[0] = args[0].toUpperCase();
		if ( !client.languages.has( args[0] ) ) return sendMsg( msg, 'Lenguaje no Disponible' );

		setLanguage( msg, args[0] );
		setLanguageUtil( msg.guild, args[0] );
		sendMsg( msg, `Lenguaje Actualizado a \`${ args[0] }\`` );
	},
};
