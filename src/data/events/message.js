import { sendMsg, getConfig } from '../util';
import { getPrefix } from '../../db/prefix';
import { checkArgs, divideArgs } from '../functions/checkArgs';
import { checkPermissions } from '../functions/checkPermissions';

const checkCommand = async ( client, msg, CMD, args ) => {
	const config = await getConfig();
	const commandFind = client.commands.get( CMD );

	const isPermitValid = await checkPermissions( msg, commandFind.req.permissions );
	if ( !isPermitValid ) return msg.reply( 'No Posee los Permisos Necesarios.' );

	const isArgsValid = await checkArgs( commandFind.req.args, args.length );
	if ( !isArgsValid ) return msg.reply( `Faltan Argumentos, Argumentos: ${ commandFind.description }` );

	try {
		commandFind.run( client, msg, args );
	} catch ( e ) {
		msg.reply( `A Ocurrido un Error Contacta al Administrador: \`${ config.devs[0] }\`` );
	}
};

const mentionPrefix = async ( client, msg ) => {
	if ( msg.content.startsWith( client.prefix ) ) {
		const args = await divideArgs( msg.content, client.prefix );
		let CMD = args.shift().toLowerCase();

		if ( client.commands.find( ( c ) => c.alias.includes( CMD ) ) ) {
			const com = client.commands.find( ( c ) => c.alias.includes( CMD ) );
			CMD = com.name;
		}
		const config = await getConfig();

		if ( !client.commands.has( CMD ) ) {
			if ( !config.splitStrings[0] ) return sendMsg( msg, 'El Comando No Existe' );

			return sendMsg( msg, `El Comando No Existe, recuerde usar \`${ config.splitStrings[1] }\` para separar los argumentos.` );
		}

		checkCommand( client, msg, CMD, args );
	}
};

const mentionBot = async ( client, msg ) => {
	if ( msg.content.startsWith( `<@!${client.user.id}>` ) ) {
		if ( msg.content === `<@!${client.user.id}>` ) {
			sendMsg( msg, `Hola, El Prefix es: \`${ client.prefix }\`` );
			return;
		}

		const data = `<@!${client.user.id}>`;
		const args = msg.content.slice( data.length ).trim().split( / +/ );
		args.unshift( client.prefix );
		msg.content = args.join( ' ' );
	}
};

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, msg ) => {
		if ( msg.author.bot ) return;

		const PREFIX = await getPrefix( msg );
		client.prefix = PREFIX;

		mentionBot( client, msg );
		mentionPrefix( client, msg );
	},
};
