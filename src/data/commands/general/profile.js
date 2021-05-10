import { MessageAttachment } from 'discord.js';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { join } from 'path';

import { roundImage } from '../../functions/imageRound';
import { sendMsg, getUserWithId } from '../../util';

const publicFolder = join( __dirname, '../../../../public' );
const wallpaper = 'https://i.imgur.com/H80vUGI.png';

const profile = async ( msg, user ) => {
	const photo = await roundImage( user.displayAvatarURL( { format: 'png' } ), 200, 200 );

	registerFont( `${ publicFolder }/fonts/itim.ttf`, {
		family: 'Itim'
	} );

	const canvasProfile = createCanvas( 600, 300 );
	const ctx = canvasProfile.getContext( '2d' );

	const image = await loadImage( wallpaper ).catch( () => {} );
	ctx.drawImage( image, 0, 0, 600, 300 );
	ctx.drawImage( photo, 350, 50 );

	ctx.fillStyle = '#FFF';
	ctx.font = '40px Itim';
	ctx.fillText( user.username, 50, 50 );

	ctx.font = '25px Itim';
	ctx.fillStyle = '#86E7E7';
	if ( user.bot ) {
		ctx.fillText( 'Bot', 430, 280 );
	} else {
		ctx.fillText( 'Humano', 408, 280 );
	}

	ctx.fillStyle = '#95A0A0';
	ctx.fillRect( 0, 80, 330, 220 );
	ctx.fillStyle = '#000';
	ctx.fillText( `Tag: #${ user.discriminator }`, 5, 105 );

	const att = new MessageAttachment( canvasProfile.toBuffer(), 'avatar.png' );

	sendMsg( msg, att );
};

export default {
	name: 'profile',
	alias: ['prf'],
	category: 'general',
	description: 'No requiere parametros',
	req: {
		args: 0,
		dm: false,
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

		await profile( msg, dataUser.user );

		msg.delete();
	},
};
