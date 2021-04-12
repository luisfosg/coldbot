import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../util';

export default {
	name: 'profile',
	alias: ['prf'],
	args: 0, /* Indica el menor numero de argumentos posibles */
	description: 'Da la Informacion de nosotros o si mencionamos a alguien nos da la Informacion de esta persona.',
	execute: async ( _client, msg, args ) => {
		let user;
		let error = false;

		if ( args[0] ) {
			const id = args[0].replace( /[<]|!|@|[>]/g, '' );
			user = await msg.guild.members.fetch( id ).catch( () => {
				sendMsg( msg, 'El Usuario No Existe' );
				error = true;
			} );
			if ( error ) return;
		}

		const dataUser = user || msg.member;
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
