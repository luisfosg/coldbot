import { MessageAttachment } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';

import { roundImage } from '../../functions/imageRound';
import { sendEmbed, sendMsg, getUserWithId } from '../../util';

import language from '../../functions/language';

let lang;
const wallpaper = 'https://fondosmil.com/fondo/67343.jpg';

const profileImage = async ( msg, user ) => {
	const photo = await roundImage( user.displayAvatarURL( { format: 'png' } ), 200, 200 );

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
	sendMsg( {
		place: msg.channel,
		text: att
	} );
};

const profile = async ( msg, user ) => {
	const member = msg.guild.members.cache.get( user.id );

	const fields = [
		[lang.profile.register, user.createdAt.toLocaleDateString(), true],
		[lang.profile.nickname, member.nickname ? member.nickname : '----------', true],
		[lang.profile.tag, `#${ user.discriminator }`, true],
		[lang.profile.entry, member.joinedAt.toLocaleDateString(), true],
		[lang.profile.status, user.presence.status, true],
		[lang.profile.bot, user.bot ? lang.general.yes : lang.general.not, true],
		[lang.profile.roles, member.roles.cache.map( ( rol ) => `\`${ rol.name }\`` ).join( ', ' )]
	];

	sendEmbed( {
		place: msg.channel,
		title: `🔵 ${ user.username }`,
		fields,
		thumbnail: user.avatarURL( { dynamic: true } ),
		footer: [`${ lang.general.id } ${ user.id }`],
	} );
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
		necessary: ['ATTACH_FILES']
	},
	run: async ( client, msg, args ) => {
		lang = language( { guild: msg.guild } );
		let user;

		if ( args[0] && args[0] !== '-img' ) {
			user = await getUserWithId( client, msg, args[0] );
		}
		if ( user === 'notFound' ) {
			return sendEmbed( {
				place: msg.channel,
				text: lang.general.userNotFound,
				deleteTime: 5
			} );
		}

		const dataUser = user || msg.author;

		if ( args[0] === '-img' || args[1] === '-img' ) {
			await profileImage( msg, dataUser );
		} else {
			await profile( msg, dataUser );
		}
	},
};
