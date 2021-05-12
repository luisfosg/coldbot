import { getLanguage } from '../db/language';

export async function getLanguageUtil( client, channel ) {
	let lang = await getLanguage( channel );
	if ( !lang ) {
		lang = channel.toUpperCase();
	}

	lang = client.languages.get( lang );
	if ( !lang ) lang = client.languages.get( 'EN' );
	return lang;
}

export async function getLogin() {
	const login = await import( '../private/login' );
	return login;
}

export async function getConfig() {
	const config = await import( './configDiscord' );
	return config;
}

export async function getUserWithId( msg, mention ) {
	const id = mention.replace( /[<]|!|@|[>]/g, '' );
	const user = await msg.guild.members.fetch( id ).catch( () => 'notFound' );

	return user;
}

export function sendMsg( client, msg ) {
	client.channel.send( msg );
}
