import { sendMsg } from '../util';

export default {
	name: 'help',
	alias: ['h'],
	args: 0,
	description: 'Help devuelve una ayuda basica de lo que hace el bot, no requiere parametros',
	execute: async ( client, msg, _args ) => {
		msg.reply( `Hola, El prefix es \`${ client.prefix }\`` );
		sendMsg( msg, ' = = = Lista de Comandos = = = ' );
		client.commands.map( ( c ) => sendMsg( msg, `> ${ client.prefix } ${ c.name }` ) );
	},
};
