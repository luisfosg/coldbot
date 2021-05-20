import { sendMsg } from '../../util';

import { setPrefix } from '../../../db/prefix';

import language from '../../functions/language';

export default {
	name: 'setprefix',
	alias: ['prefix', 'pref'],
	category: 'bot',
	usage: ( langs ) => langs.prefix.usage,
	description: ( langs ) => langs.prefix.description,
	req: {
		minArgs: 1,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, args ) => {
		const lang = language( client, msg.guild );
		setPrefix( msg, args[0] );

		sendMsg( msg, lang.prefix.message.replace( '{{ prefix }}', args[0] ) );
		msg.delete();
	},
};
