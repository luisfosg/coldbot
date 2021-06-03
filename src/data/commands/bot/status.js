import { sendEmbed } from '../../util';
import language from '../../functions/language';

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
		permissions: ['OWNER_PROGRAMMER-MEMBER'],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const lang = language( client, msg.guild );

		client.user.setPresence( {
			status: args[0],
			activity: {
				type: args[1],
				name: args[2],
				url: args[3] ? args[3] : 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
			},
		} );

		sendEmbed( { place: msg.channel, text: lang.status.text, deleteTime: 10 } );
		msg.delete().catch( () => {} );
	},
};
