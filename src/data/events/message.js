import { sendMsg } from '../util';
import { getPrefix } from '../../db/prefix';
import { checkArgs } from '../functions/checkargs';

export default async ( client, msg ) => {
	if ( msg.author.bot ) return;

	const PREFIX = await getPrefix( msg );
	client.prefix = PREFIX;

	if ( msg.content.startsWith( `<@!${client.user.id}>` ) ) {
		sendMsg( msg, `Hola, El Prefix es: \`${ PREFIX }\`` );
		return;
	}

	if ( msg.content.startsWith( PREFIX ) ) {
		const args = msg.content.slice( PREFIX.length ).trim().split( / +/ );
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
