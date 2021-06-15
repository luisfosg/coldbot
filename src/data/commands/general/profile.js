import { MessageAttachment } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';

import { roundImage } from '../../functions/canvasFunctions';
import { sendEmbed, sendMsg, getUserWithId } from '../../util';

import language from '../../functions/language';

let lang;
const wallpaper = 'https://i.imgur.com/VSQ9W1i.jpg';

const profileImage = async ( msg, user ) => {
	const member = msg.guild.members.cache.get( user.id );
	const photo = await roundImage( user.displayAvatarURL( { format: 'png' } ), 200 );

	const canvasProfile = createCanvas( 600, 300 );
	const ctx = canvasProfile.getContext( '2d' );

	const image = await loadImage( wallpaper ).catch( () => {} );
	const circle = await loadImage( 'https://i.imgur.com/KKgVrcU.png' ).catch( () => {} );
	ctx.drawImage( image, 0, 0, 600, 300 );
	ctx.drawImage( photo, 370, 50 );
	ctx.drawImage( circle, 340, 25, 250, 250 );

	ctx.fillStyle = '#FFF';
	ctx.font = '40px Itim';
	ctx.fillText( user.username, 50, 50 );

	ctx.font = '25px Itim';

	ctx.fillStyle = '#95A0A090';
	ctx.fillRect( 0, 80, 330, 220 );

	ctx.fillStyle = '#000';
	if ( user.bot ) {
		ctx.fillText( lang.profile.bot, 5, 265 );
	} else {
		ctx.fillText( lang.profile.human, 5, 265 );
	}
	ctx.fillText( lang.profile.tagImg.replace( '{{ tag }}', user.discriminator ), 5, 105 );
	ctx.fillText( `${lang.profile.nickname}: ${ member.nickname ? member.nickname : '----------' }`, 5, 140 );
	ctx.fillText( `${lang.profile.status}: ${ user.presence.status }`, 5, 175 );
	ctx.font = '15px Itim';
	ctx.fillText( `${lang.general.id}${ user.id }`, 5, 285 );

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

		[
			`${lang.profile.roles} [${member._roles.length}]`,
			member._roles.length > 0 ? member._roles.map( ( rol ) => `<@&${rol}>` ).join( ', ' ) : lang.profile.notRoles
		]
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
	alias: ['userinfo'],
	category: 'general',
	usage: ( langs, p, s ) => langs.profile.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.profile.description,
	req: {
		minArgs: 0,
		cooldown: 10,
		dm: 'not',
		enable: true,
		visible: true,
		permissions: [],
		necessary: ['ATTACH_FILES']
	},
	run: async ( client, msg, args ) => {
		lang = language( { guild: msg.guild } );
		let user;

		if ( args[0] && args[0] !== '-img' ) {
			user = await getUserWithId( { client, msg, mention: args[0] } );
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
