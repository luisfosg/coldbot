import { sendMsg } from '../util';

export default {
	name: 'prefix',
	alias: ['pref'],
	args: '1',
	description: 'Pruebas',
	execute: async ( _client, msg, args ) => {
		msg.delete();
		sendMsg( msg, `Cambiando el Prefix a ${ args[0] }` );
	},
};
