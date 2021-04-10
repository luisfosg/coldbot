import { sendMsg } from '../util';

export default {
	name: 'prefix',
	alias: ['pref'],
	args: 1,
	description: 'Para cambiar el prefix se requiere un argumento.',
	execute: async ( _client, msg, args ) => {
		sendMsg( msg, `Cambiando el Prefix a ${ args[0] }` );
	},
};
