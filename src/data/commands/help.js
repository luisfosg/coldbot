import { sendMsg } from '../util';

export default {
	name: 'help',
	alias: ['h'],
	args: 0,
	description: 'Help devuelve una ayuda basica de lo que hace el bot, no requiere parametros',
	execute: async ( _client, msg, _args ) => {
		sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
