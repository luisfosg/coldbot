import { getConfig } from '../../util';

export default {
	name: 'status',
	alias: ['st'],
	category: 'bot',
	usage: ( langs, p, s ) => langs.status.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.status.description,
	req: {
		minArgs: 3,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: false,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		const config = await getConfig();

		if ( config.devs[0][1] === msg.author.id ) {
			client.user.setPresence( {
				status: args[0],
				activity: {
					type: args[1],
					name: args[2],
					url: args[3] ? args[3] : 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
				},
			} );
		} else {
			msg.reply( 'Ud no puede usar este comando nmms' );
		}

		msg.delete().catch( () => {} );
	},
};
