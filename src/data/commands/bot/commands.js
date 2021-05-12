import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../../util';

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setTimestamp( Date.now() );
	embed.setTitle( 'Lista de Comandos' );
	embed.setAuthor( msg.author.username, msg.author.avatarURL() );

	const isdm = msg.channel.type;

	client.commands.map( ( c ) => {
		if ( ( isdm === 'dm' ) && !c.req.dm ) return false;
		if ( c.req.visible ) {
			return embed.addField(
				`${ client.prefix } ${ c.name }`,
				'------------------------------'
			);
		}
		return false;
	} );

	sendMsg( msg, embed );
};

export default {
	name: 'commands',
	alias: ['cmd'],
	category: 'bot',
	usage: '',
	description: '',
	req: {
		args: 0,
		dm: true,
		enable: true,
		visible: false,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		await commandMessage( client, msg );
		msg.delete().catch( () => {} );
	},
};
