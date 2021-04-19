import { sendMsg } from '../util';

import { getSplit } from '../../db/splitString';

export default {
	name: 'split',
	alias: ['spl', 'string'],
	description: '',
	req: {
		args: 2,
		enable: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, _args ) => {
		const split = await getSplit( msg );
		sendMsg( msg, split.value );
	},
};
