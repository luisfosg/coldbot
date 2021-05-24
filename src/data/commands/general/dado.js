import { MessageEmbed } from 'discord.js';

import { color } from '../../util';

import language from '../../functions/language';

const animate = [
	'https://media.giphy.com/media/l4hLAf6Eo8DEcO5ZS/giphy.gif',
	'https://media.giphy.com/media/kEhxvWwGBqBOHrMFyS/giphy.gif',
	'https://media.giphy.com/media/3oGRFlpAW4sIHA02NW/giphy.gif',
	'https://media.giphy.com/media/ckHAdLU2OmY7knUClD/giphy.gif',
	'https://media.giphy.com/media/l2JdUMnCDg6qs368g/giphy.gif',
	'https://media.giphy.com/media/taDxtc7by09TZ03ciP/giphy.gif',
	'https://media.giphy.com/media/5xtDarpTZP1hgRgReLK/giphy.gif',
	'https://media.giphy.com/media/MdoycLRBmVoT7I89Xt/giphy.gif',
	'https://media.giphy.com/media/J47aDyxakxYlt53KKW/giphy.gif',
	'https://media.giphy.com/media/hqTZTTIT4l1ogOWihJ/giphy.gif'
];
const faceDice = [
	'https://i.imgur.com/G7Xs4B6.png?1',
	'https://i.imgur.com/POHCZVV.png?1',
	'https://i.imgur.com/wpZXcCz.png?1',
	'https://i.imgur.com/VS10kg8.png?1',
	'https://i.imgur.com/KeCBEGo.png?1',
	'https://i.imgur.com/VJaOIPK.png?2'
];

export default {
	name: 'dice',
	alias: ['dado'],
	category: 'general',
	usage: ( langs ) => langs.help.usage,
	description: ( langs ) => langs.help.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		const lang = language( client, msg.guild );
		const embedAnimate = new MessageEmbed();

		embedAnimate.setColor( color() );
		embedAnimate.setTitle( lang.dice.titleGif );
		embedAnimate.setImage( animate[Math.floor( Math.random() * animate.length )] );

		msg.channel.send( embedAnimate ).then( ( msgDice ) => {
			setTimeout( () => {
				const embed = new MessageEmbed();

				embed.setColor( color() );
				embed.setTitle( lang.dice.titleDice.replace( '{{ user }}', msg.author.username ) );
				embed.setImage( faceDice[Math.floor( Math.random() * faceDice.length )] );

				msgDice.edit( embed );
			}, 3000 );
		} );
	},
};
