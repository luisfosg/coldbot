import { sendEmbed } from '../../util';

import language from '../../functions/language';

export default {
	name: 'serverinfo',
	alias: ['server'],
	category: 'general',
	usage: ( langs, p, s ) => langs.server.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.server.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( _client, msg, _args ) => {
		const lang = language( { guild: msg.guild } );
		const server = msg.guild;

		const fields = [
			[lang.server.id, server.id, true],
			[lang.server.region, server.region, true],
			[lang.server.date, server.joinedAt.toLocaleDateString(), true],
			[lang.server.owner, `${ server.owner.user.username }#${ server.owner.user.discriminator }`, true],
			[lang.server.members, server.memberCount, true]
		];

		sendEmbed( {
			place: msg.channel,
			thumbnail: server.iconURL(),
			fields,
			author: [server.name, server.iconURL()]
		} );
	},
};
