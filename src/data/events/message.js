import { getConfig, sendMsg } from '../util';

export default async ( client, msg ) => {
	const config = await getConfig();
	const PREFIX = config.prefix;

	if ( msg.author.bot ) return;

	if ( msg.content.startsWith( `<@!${client.user.id}>` ) ) {
		sendMsg( msg, `Hi, The Prefix is ${ PREFIX }` );
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

		try {
			client.commands.get( CMD ).execute( client, msg, args );
		} catch ( e ) {
			msg.reply( 'A Ocurrido un Error Contacta al Administrador :0' );
		}
	}
};
