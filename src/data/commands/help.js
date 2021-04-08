import util from '../util';

module.exports = {
	name: 'help',
	alias: ['h'],
	description: 'Pruebas',
	execute: ( client, msg, _args ) => {
		util.sendMsg( msg, `<@${client.user.id}>` );
		util.sendMsg( msg, 'Aun No tenemos ayudas xD' );
	},
};
