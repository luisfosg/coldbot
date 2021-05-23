import { MessageEmbed } from 'discord.js';

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
	'https://i.imgur.com/oOQ90uW.png',
	'https://i.imgur.com/nX06zbG.png',
	'https://i.imgur.com/hIQMjSc.png',
	'https://i.imgur.com/AREchPy.png',
	'https://i.imgur.com/BgNSKq8.png',
	'https://i.imgur.com/BsQvqjT.png'
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
	run: async ( _client, msg, _args ) => {
		const embedAnimate = new MessageEmbed();

		embedAnimate.setTitle( 'Lanzando dado..' );
		embedAnimate.setImage( animate[Math.floor( Math.random() * animate.length )] );

		msg.channel.send( embedAnimate ).then( ( msgDice ) => {
			setTimeout( () => {
				const embed = new MessageEmbed();

				embed.setTitle( 'El dado saco: ' );
				embed.setImage( faceDice[Math.floor( Math.random() * faceDice.length )] );

				msgDice.edit( embed );
			}, 3000 );
		} );
	},
};
