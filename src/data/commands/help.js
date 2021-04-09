import util from '../util';

export default {
	name: 'help',
	alias: ['h'],
	description: 'Pruebas',
	execute: async ( client, msg, _args ) => {
		util.sendMsg( msg, `<@${client.user.id}>` );
		util.sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
