import { sendMsg } from '../util';

export default {
	name: 'split',
	alias: ['spl', 'string'],
	description: '',
	req: {
		args: 2,
		enable: false,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, _args ) => {
		sendMsg( msg, 'olv' );
		msg.delete();
	},
};
