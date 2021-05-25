import { MessageAttachment, MessageEmbed } from 'discord.js';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { join } from 'path';

import { roundImage } from '../../functions/imageRound';
import { sendMsg, getUserWithId } from '../../util';

import language from '../../functions/language';

let lang;
const publicFolder = join( __dirname, '../../../../public' );
const wallpaper = 'https://i.imgur.com/H80vUGI.png';

const profileImage = async ( msg, user ) => {
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
		ctx.fillText( lang.profile.bot, 430, 280 );
	} else {
		ctx.fillText( lang.profile.human, 408, 280 );
	}

	ctx.fillStyle = '#95A0A0';
	ctx.fillRect( 0, 80, 330, 220 );
	ctx.fillStyle = '#000';
	ctx.fillText( lang.profile.tagImg.replace( '{{ tag }}', user.discriminator ), 5, 105 );

	const att = new MessageAttachment( canvasProfile.toBuffer(), 'avatar.png' );

	sendMsg( msg, att );
};

const profile = async ( msg, user ) => {
	const member = msg.guild.members.cache.get( user.id );
	const embed = new MessageEmbed();

	embed.setTitle( `🔵 ${ user.username }` );
	embed.setThumbnail( user.avatarURL( { dynamic: true } ) );
	embed.addField( lang.profile.register, user.createdAt.toLocaleDateString(), true );
	embed.addField( lang.profile.nickname, member.nickname ? member.nickname : '----------', true );
	embed.addField( lang.profile.tag, `#${ user.discriminator }`, true );
	embed.addField( lang.profile.entry, member.joinedAt.toLocaleDateString(), true );
	embed.addField( lang.profile.status, user.presence.status, true );
	embed.addField( lang.profile.bot, user.bot ? lang.general.yes : lang.general.not, true );
	embed.addField(
		lang.profile.roles, member.roles.cache.map( ( rol ) => `\`${ rol.name }\`` ).join( ', ' )
	);
	embed.setFooter( `${ lang.general.id } ${ user.id }` );

	sendMsg( msg, embed );
};

export default {
	name: 'profile',
	alias: ['prf'],
	category: 'general',
	usage: ( langs, p, s ) => langs.profile.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.profile.description,
	req: {
		minArgs: 0,
		cooldown: 10,
		dm: false,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
		lang = language( client, msg.guild );
		let user;

		if ( args[0] && args[0] !== '-img' ) {
			user = await getUserWithId( client, msg, args[0] );
		}
		if ( user === 'notFound' ) return sendMsg( msg, lang.general.userNotFound );

		const dataUser = user || msg.author;

		if ( args[0] === '-img' || args[1] === '-img' ) {
			await profileImage( msg, dataUser );
		} else {
			await profile( msg, dataUser );
		}

		msg.delete();
	},
};
