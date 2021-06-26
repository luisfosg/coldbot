import { sendEmbed, getDate } from '../../util';

import language from '../../functions/language';

export default {
	name: 'serverinfo',
	alias: ['server'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.server.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.server.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: 'not',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( _client, msg, _args ) => {
		const lang = language( { guild: msg.guild } );

		const server = msg.guild;

		const fields = [
			[lang.server.region, server.region, true],
			[lang.server.date, getDate( { lang, date: server.createdTimestamp } )],
			[lang.server.owner, `<@${server.owner.user.id}>`, true],
			[lang.server.members, server.memberCount, true]
		];

		sendEmbed( {
			place: msg.channel,
			thumbnail: server.iconURL( { dynamic: true } ),
			fields,
			author: [server.name, server.iconURL( { dynamic: true } )],
			footer: [`${lang.server.id}: ${server.id}`]
		} );
	},
};
