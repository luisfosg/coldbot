import Util from '../util';

export default {
	name: 'help',
	alias: ['h'],
	description: 'Pruebas',
	execute: async ( client, msg, _args ) => {
		Util.sendMsg( msg, `<@${client.user.id}>` );
		Util.sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
