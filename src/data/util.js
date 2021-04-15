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
