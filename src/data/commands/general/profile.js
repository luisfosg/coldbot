import { MessageAttachment } from 'discord.js';

import { roundImage } from '../../functions/imageRound';
import { sendMsg, getUserWithId } from '../../util';

const profile = async ( msg, user ) => {
	const image = await roundImage( user.displayAvatarURL( { format: 'png' } ), 150, 150 );
	const att = new MessageAttachment( image.toBuffer(), 'avatar.png' );

	sendMsg( msg, att );
};

export default {
	name: 'profile',
	alias: ['prf'],
	category: 'general',
	description: 'No requiere parametros',
	req: {
		args: 0,
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
		profile( msg, dataUser.user );

		msg.delete();
	},
};
