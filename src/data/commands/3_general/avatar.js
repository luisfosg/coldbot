import { MessageEmbed } from 'discord.js';

import { sendMsg, getUserWithId } from '../../util';

const avatar = async ( msg, user ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#86E7E7' );
	embed.setAuthor( msg.author.username, msg.author.displayAvatarURL() );
	embed.setTitle( `Avatar de ${user.username}` );
	embed.setURL( user.avatarURL( { format: 'png', size: 512 } ) );
	embed.setImage( user.displayAvatarURL( { format: 'png', size: 512 } ) );

	sendMsg( msg, embed );
};

export default {
	name: 'getavatar',
	alias: ['avatar'],
	category: 'general',
	usage: 'no',
	description: 'no',
	req: {
		args: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( _client, msg, args ) => {
		let user;

		if ( args[0] ) {
			user = await getUserWithId( msg, args[0] );
		}
		if ( user === 'notFound' ) return sendMsg( msg, 'Usuario No Encontrado' );

		const dataUser = user || msg.member;

		await avatar( msg, dataUser.user );
		msg.delete();
	}
};
