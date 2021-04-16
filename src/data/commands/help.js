import { sendMsg } from '../util';

export default {
	name: 'help',
	alias: ['h'],
	description: 'No requiere parametros',
	req: {
		args: 0,
		enable: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		msg.reply( `Hola, El prefix es \`${ client.prefix }\`` );
		sendMsg( msg, ' = = = Lista de Comandos = = = ' );
		client.commands.map( ( c ) => sendMsg( msg, `> ${ client.prefix } ${ c.name }` ) );
	},
};
