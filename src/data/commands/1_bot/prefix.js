import { sendMsg } from '../../util';

import { setPrefix } from '../../../db/prefix';

export default {
	name: 'setprefix',
	alias: ['prefix', 'pref'],
	category: 'bot',
	usage: 'no',
	description: 'no',
	req: {
		args: 1,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, args ) => {
		setPrefix( msg, args[0] );

		sendMsg( msg, `Cambiando el Prefix a \`${ args[0] }\`` );
		msg.delete();
	},
};
