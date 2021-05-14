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

		console.log(
			`\n ${ lang.ready.bot.replace(
				'{{ nameBot }}',
				client.user.tag
			) }! \n`
		);

		console.log(
			`${ lang.ready.events.replace(
				'{{ events }}',
				client.eventCount
			) }`
		);
		console.log(
			`${ lang.ready.commands.replace(
				'{{ commands }}',
				client.commands.size
			) }`
		);

		console.log( client.categories );

		console.log( '======================' );

		console.log(
			`${ lang.ready.servers.replace(
				'{{ servers }}',
				client.guilds.cache.size
			) }`
		);

		console.log(
			`${ lang.ready.users.replace(
				'{{ users }}',
				client.users.cache.size
			) }\n`
		);

		/* =========Server Presence======== */

		const name = lang.ready.actiName.replace(
			'{{ servers }}',
			client.guilds.cache.size
		);

		client.user.setPresence( {
			activity: {
				name,
				url: 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
				type: 'STREAMING'
			},
			status: 'dnd'
		} );
	},
};
