/* eslint-disable no-unused-expressions */
import { MessageEmbed } from 'discord.js';

import { sendMsg, getUserWithId } from '../../util';

import language from '../../functions/language';

let lang;

const avatar = async ( msg, user ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#86E7E7' );
	embed.setAuthor( msg.author.username, msg.author.displayAvatarURL() );
	embed.setTitle( lang.avatar.title.replace( '{{ user }}', user.username ) );
	embed.setURL( user.avatarURL( { format: 'png', size: 512 } ) );
	embed.setImage( user.displayAvatarURL( { format: 'png', size: 512 } ) );

	sendMsg( msg, embed );
};

export default {
	name: 'getavatar',
	alias: ['avatar'],
	category: 'general',
	usage: ( langs ) => langs.avatar.usage,
	description: ( langs ) => langs.avatar.description,
	req: {
		args: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
		lang = language( client, msg.guild );
		let user;

		if ( args[0] ) {
			user = await getUserWithId( client, msg, args[0] );
		}
		if ( user === 'notFound' ) return sendMsg( msg, lang.general.userNotFound );

		let dataUser = user || msg.member;
		!dataUser ? dataUser = msg.author : dataUser = dataUser.user;

		await avatar( msg, dataUser );
		msg.delete().catch( () => {} );
	}
};
