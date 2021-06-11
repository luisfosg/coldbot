import { MessageEmbed } from 'discord.js';

let config;

export async function getLogin() {
	const login = await import( '../private/login' );
	return login;
}

export async function getConfig() {
	config = await import( './configDiscord' );
	return config;
}

export async function getUserWithId( client, msg, mention, member = false ) {
	const id = mention.replace( /[<]|!|@|[>]/g, '' );
	let user;
	if ( msg.guild ) {
		user = await msg.guild.members.fetch( id ).catch( () => 'notFound' );
	} else {
		user = client;
	}

	if ( member ) return user;
	// eslint-disable-next-line no-unused-expressions
	user === 'notFound' ? user : user = user.user;
	return user;
}

export function getLink( client ) {
	return `https://discord.com/api/oauth2/authorize?client_id=${ client.user.id }&permissions=8&scope=bot`;
}

export const sendMsg = ( {
	place,
	text,
	reply = false,
	deleteTime = false
} ) => {
	if ( reply ) {
		if ( deleteTime ) {
			return place.reply( text ).then( ( msg ) => {
				msg.delete( { timeout: deleteTime * 1000 } ).catch( () => {} );
			} ).catch( () => {} );
		}
		return place.reply( text ).catch( () => {} );
	}

	if ( deleteTime ) {
		return place.send( text ).then( ( msg ) => {
			msg.delete( { timeout: deleteTime * 1000 } ).catch( () => {} );
		} ).catch( () => {} );
	}
	place.send( text ).catch( () => {} );
};

export const sendEmbed = ( {
	place,
	title = '',
	text = '',
	fields = false,
	image = false,
	author = false,
	timestamp = false,
	thumbnail = false,
	url = false,
	footer = false,
	deleteTime = false,
	returnEmbed = false
} ) => {
	const embed = new MessageEmbed();

	embed.setColor( config.color );
	embed.setTitle( title );
	embed.setDescription( text );

	if ( thumbnail ) embed.setThumbnail( thumbnail );
	if ( timestamp ) embed.setTimestamp( Date.now() );
	if ( author ) embed.setAuthor( author[0], author[1] );
	if ( url ) embed.setURL( url );
	if ( footer ) {
		if ( footer.length > 1 ) {
			embed.setFooter( footer[0], footer[1] );
		} else {
			embed.setFooter( footer );
		}
	}

	if ( image ) {
		embed.setImage( image );
	}
	if ( fields ) {
		fields.forEach( ( field ) => {
			if ( field[2] ) {
				embed.addField( field[0], field[1], field[2] );
			} else {
				embed.addField( field[0], field[1] );
			}
		} );
	}

	if ( returnEmbed ) return embed;

	if ( deleteTime ) {
		return place.send( embed ).then( ( msg ) => {
			msg.delete( { timeout: deleteTime * 1000 } ).catch( () => {} );
		} ).catch( () => {} );
	}
	place.send( embed ).catch( () => {} );
};
