import { MessageEmbed } from 'discord.js';

import { sendMsg, getUserWithId } from '../util';

const profile = async ( msg, user ) => {
	const embed = new MessageEmbed();

	embed.setColor( 'RANDOM' );
	embed.setImage( user.displayAvatarURL() );
	embed.setAuthor( msg.member.user.username, msg.member.user.displayAvatarURL() );
	embed.setTitle( `${ user.username}#${ user.discriminator}` );
	embed.setTimestamp( Date.now() );

	if ( user.bot ) {
		embed.setFooter( 'Bot' );
	} else {
		embed.setFooter( 'Human' );
	}

	return embed;
};

export default {
	name: 'profile',
	alias: ['prf'],
	description: 'Da la Informacion de nosotros o si mencionamos a alguien nos da la Informacion de esta persona.',
	req: {
		args: 0,
		enable: true,
		permissions: [],
	},
	run: async ( _client, msg, args ) => {
		let user;

		if ( args[0] ) {
			user = await getUserWithId( msg, args[0] );
		}
		if ( user === 'notFound' ) return sendMsg( msg, 'Usuario No Encontrado' );

		const dataUser = user || msg.member;
		const embed = await profile( msg, dataUser.user );

		sendMsg( msg, embed );
		msg.delete();
	},
};
