import { MessageEmbed } from 'discord.js';
import { registerFont } from 'canvas';
import { join } from 'path';

let config;

export const importFonts = async () => {
	const publicFolder = join( __dirname, '../../public' );

	registerFont( `${ publicFolder }/fonts/itim.ttf`, {
		family: 'Itim'
	} );
	registerFont( `${ publicFolder }/fonts/comicsans.ttf`, {
		family: 'Comic Sans MS'
	} );
};

export async function getLogin() {
	const login = await import( '../private/login' );
	return login;
}

export async function getConfig() {
	config = await import( './configDiscord' );
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

export const sendMsgNew = ( {
	place,
	text,
} ) => {
	place.send( text );
};

export const sendEmbed = ( {
	place,
	title = '',
	text = '',
	timestamp = false,
	footer = false,
	returnEmbed = false
} ) => {
	const embed = new MessageEmbed();

	embed.setColor( config.color );
	embed.setTitle( title );
	embed.setDescription( text );

	if ( timestamp ) embed.setTimestamp();
	if ( footer ) embed.setFooter( footer[0], footer[1] );

	if ( returnEmbed ) return embed;
	place.send( embed ).catch( () => {} );
};

export function getLink( client ) {
	return `https://discord.com/api/oauth2/authorize?client_id=${ client.user.id }&permissions=8&scope=bot`;
}
