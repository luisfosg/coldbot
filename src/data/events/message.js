import { sendMsg } from '../util';
import { getPrefix } from '../../db/prefix';
import { checkArgs } from '../functions/checkArg';
import { checkPermissions } from '../functions/checkPermissions';

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

const mentionPrefix = async ( client, msg ) => {
	if ( msg.content.startsWith( client.prefix ) ) {
		const args = msg.content.slice( client.prefix.length ).trim().split( / +/ );
		let CMD = args.shift().toLowerCase();

		if ( client.commands.find( ( c ) => c.alias.includes( CMD ) ) ) {
			const com = client.commands.find( ( c ) => c.alias.includes( CMD ) );
			CMD = com.name;
		}

		if ( !client.commands.has( CMD ) ) {
			sendMsg( msg, 'El Comando No Existe' );
			return;
		}

		const commandFind = client.commands.get( CMD );

		const isPermitValid = await checkPermissions( msg, commandFind.req.permissions );
		if ( !isPermitValid ) return msg.reply( `No Posee los Permisos Necesarios, \`Descripción\`: ${ commandFind.description }` );

		const isArgsValid = await checkArgs( commandFind.req.args, args.length );
		if ( !isArgsValid ) return msg.reply( `Faltan Argumentos, \`Descripción\`: ${ commandFind.description }` );

		try {
			commandFind.execute( client, msg, args );
		} catch ( e ) {
			msg.reply( 'A Ocurrido un Error Contacta al Administrador :0' );
		}
	}
};

export default async ( client, msg ) => {
	if ( msg.author.bot ) return;

	const PREFIX = await getPrefix( msg );
	client.prefix = PREFIX;

	mentionBot( client, msg );
	mentionPrefix( client, msg );
};
