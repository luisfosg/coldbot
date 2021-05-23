export async function getLogin() {
	const login = await import( '../private/login' );
	return login;
}

export async function getConfig() {
	const config = await import( './configDiscord' );
	return config;
}

export async function getUserWithId( client, msg, mention ) {
	const id = mention.replace( /[<]|!|@|[>]/g, '' );
	let user;
	if ( msg.guild ) {
		user = await msg.guild.members.fetch( id ).catch( () => 'notFound' );
	} else {
		user = client;
	}

	// eslint-disable-next-line no-unused-expressions
	user === 'notFound' ? user : user = user.user;
	return user;
}

export function sendMsg( msgInfoClient, messageSend ) {
	msgInfoClient.channel.send( messageSend );
}

export function getLink( client ) {
	return `https://discord.com/api/oauth2/authorize?client_id=${ client.user.id }&permissions=8&scope=bot`;
}
