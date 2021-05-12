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
		const lang = await getLanguageUtil( client, language );
		/* ================= */
		console.log( `\n ${ lang.ready.bot }${ client.user.tag }! \n` );
		console.log( `${ lang.ready.servers }${client.guilds.cache.size} ` );
		console.log( `${ lang.ready.users }${client.users.cache.size} \n` );

		client.user.setPresence( {
			activity: {
				name: `${ lang.ready.acti1 }${ client.guilds.cache.size }${ lang.ready.acti2 }`,
				url: 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
				type: 'STREAMING'
			},
			status: 'dnd'
		} );
	},
};
