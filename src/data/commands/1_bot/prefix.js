import { sendMsg } from '../../util';

import { setPrefix } from '../../../db/prefix';

export default {
	name: 'prefix',
	alias: ['pref'],
	category: 'bot',
	usage: '',
	description: '',
	req: {
		args: 1,
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
