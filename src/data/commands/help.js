import { sendMsg, getConfig } from '../util';

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
		const config = await getConfig();

		if ( !config.splitStrings[0] ) return msg.reply( `Hola, El prefix es \`${ client.prefix }\`` );

		msg.reply( `Hola, El prefix es \`${ client.prefix }\`, y el separador de argumentos es \`${ config.splitStrings[1] }\`` );

		sendMsg( msg, ' = = = Lista de Comandos = = = ' );
		client.commands.map( ( c ) => sendMsg( msg, `> ${ client.prefix } ${ c.name }` ) );
	},
};
