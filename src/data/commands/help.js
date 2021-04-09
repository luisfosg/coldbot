import { sendMsg } from '../util';

export default {
	name: 'help',
	alias: ['h'],
	args: '0',
	description: 'Pruebas',
	execute: async ( client, msg, _args ) => {
		sendMsg( msg, `<@${client.user.id}>` );
		sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
