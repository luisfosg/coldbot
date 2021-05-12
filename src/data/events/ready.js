/* eslint-disable no-console */
import { language } from '../configDiscord';

import { getLanguageUtil } from '../util';

export default {
	name: 'ready',
	req: {
		once: true,
		enable: true,
	},
	run: async ( client ) => {
		console.log( await getLanguageUtil( client, language ) );
		/* ================= */
		console.log( `\n Bot listo como: ${ client.user.tag }! \n` );
		console.log( `Numero de Servidores: ${client.guilds.cache.size} ` );
		console.log( `Numero de Usuarios: ${client.users.cache.size} \n` );

		client.user.setPresence( {
			activity: {
				name: `Cold Bot esta en ${ client.guilds.cache.size } servidores. Vamo a por mas.`,
				url: 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
				type: 'STREAMING'
			},
			status: 'dnd'
		} );
	},
};
