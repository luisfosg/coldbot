import { MessageAttachment } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';

import { sendEmbed, sendMsg } from '../../util';

import language from '../../functions/language';

let lang;

const loadMeme = async ( msg, image, txt, color ) => {
	const canvasMeme = createCanvas( 700, 500 );
	const ctx = canvasMeme.getContext( '2d' );

	const photo = await loadImage( image ).catch( () => {} );
	if ( !photo ) {
		return sendEmbed( {
			place: msg.channel,
			text: lang.meme.imgNotWork,
			deleteTime: 5
		} );
	}

	ctx.fillStyle = '#FFF';
	ctx.fillRect( 0, 0, 700, 100 );

	ctx.fillStyle = color;
	ctx.font = '40px Comicsans';
	ctx.textAlign = 'center';

	ctx.drawImage( photo, 0, 100, 700, 400 );
	ctx.fillText( txt, canvasMeme.width / 2, 50 );

	const att = new MessageAttachment( canvasMeme.toBuffer(), 'meme.png' );
	sendMsg( {
		place: msg.channel,
		text: att
	} );
};

export default {
	name: 'meme',
	alias: ['momo', 'mm'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.meme.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.meme.description,
	req: {
		minArgs: 2,
		cooldown: 10,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: ['ATTACH_FILES']
	},
	run: async ( _client, msg, args ) => {
		lang = language( { guild: msg.guild } );
		let color = args[2];

		const test1 = /^#([0-9A-F]{3}){1,2}$/i.test( color );
		const test3 = /^#[0-9A-F]{8}$/i.test( color );

		if ( !color || ( test1 && test3 ) ) color = '#000';

		await loadMeme( msg, args[0], args[1], color );
	},
};
