import { MessageAttachment } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';

import { sendMsg } from '../../util';

const loadMeme = async ( msg, image, txt, color ) => {
	const canvasMeme = createCanvas( 600, 400 );
	const ctx = canvasMeme.getContext( '2d' );

	const photo = await loadImage( image ).catch( () => {} );
	if ( !photo ) return sendMsg( msg, 'La Imagen Enviada No Sirve...' );

	ctx.drawImage( photo, 0, 0, 600, 400 );
	ctx.fillStyle = color;
	ctx.font = '40px Comic Sans MS';
	ctx.fillText( txt, 50, 50 );

	const att = new MessageAttachment( canvasMeme.toBuffer(), 'meme.png' );
	sendMsg( msg, att );
	msg.delete().catch( () => {} );
};

export default {
	name: 'meme',
	alias: ['momo', 'mm'],
	category: 'beta',
	usage: 'no',
	description: 'no',
	req: {
		args: 2,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( _client, msg, args ) => {
		const image = args[0];
		const txt = args[1];
		let color = args[2];

		const test1 = /^#([0-9A-F]{3}){1,2}$/i.test( color );
		const test2 = /^#[0-9A-F]{6}$/i.test( color );
		const test3 = /^#[0-9A-F]{8}$/i.test( color );

		if ( !color || ( test1 && test2 && test3 ) ) color = '#000';

		await loadMeme( msg, image, txt, color );
	},
};
