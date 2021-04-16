import { sendMsg } from '../util';
import { splDes } from '../configDiscord';

import { setPrefix } from '../../db/prefix';

export default {
	name: 'prefix',
	alias: ['pref'],
	description: `${splDes()}\`nuevo prefix\`${splDes()}`,
	req: {
		args: 1,
		enable: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, args ) => {
		setPrefix( msg, args[0] );

		sendMsg( msg, `Cambiando el Prefix a \`${ args[0] }\`` );
		msg.delete();
	},
};
