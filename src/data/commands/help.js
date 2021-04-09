import { sendMsg } from '../util';

export default {
	name: 'help',
	alias: ['h'],
	description: 'Pruebas',
	execute: async ( client, msg, _args ) => {
		sendMsg( msg, `<@${client.user.id}>` );
		sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
