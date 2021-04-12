import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../util';

export default {
	name: 'profile',
	alias: ['prf'],
	args: 0,
	description: 'Da la Informacion de nosotros o si mencionamos a alguien nos da la Informacion de esta persona.',
	execute: async ( _client, msg, _args ) => {
		const dataUser = msg.mentions.members.first() || msg.member;
		const embed = new MessageEmbed();

		embed.setColor( 'RANDOM' );
		embed.setImage( dataUser.user.displayAvatarURL() );
		embed.setAuthor( msg.member.user.username, msg.member.user.displayAvatarURL() );
		embed.setTitle( `${dataUser.user.username}#${dataUser.user.discriminator}` );
		embed.setTimestamp( Date.now() );

		if ( dataUser.user.bot ) {
			embed.setFooter( 'Bot' );
		} else {
			embed.setFooter( 'Human' );
		}

		sendMsg( msg, embed );
		msg.delete();
	},
};
