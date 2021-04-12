import { sendMsg } from '../util';
import { getPrefix } from '../../db/prefix';
import { checkArgs } from '../functions/checkargs';

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
		const isArgsValid = await checkArgs( commandFind.args, args.length );

		if ( isArgsValid ) {
			try {
				commandFind.execute( client, msg, args );
			} catch ( e ) {
				msg.reply( 'A Ocurrido un Error Contacta al Administrador :0' );
			}
		} else {
			msg.reply( `Faltan Argumentos, Descripción: ${ commandFind.description }` );
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
