import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../../util';

const printCategory = ( client, msg, embed, category ) => {
	const isdm = msg.channel.type;
	const commands = client.commands.filter( ( cmd ) => {
		if ( cmd.category === category ) {
			if ( ( isdm === 'dm' ) && !cmd.req.dm ) return false;
			if ( cmd.req.visible ) {
				return true;
			}
		}
		return false;
	} );

	const nameCategory = category.charAt( 0 ).toUpperCase() + category.slice( 1 );

	if ( commands.size > 0 ) {
		embed.addField(
			`:snowflake: ${ nameCategory } [${commands.size}]:`, commands.map( ( cmd ) => `\`${ cmd.name }\`` ).join( ' | ' )
		);
	}
};

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setAuthor( msg.author.username, msg.author.avatarURL() );
	embed.setTimestamp( Date.now() );
	embed.setTitle( '> Lista de Comandos' );

	embed.setDescription( `Comandos: \`${ client.commands.size }\`` );
	embed.setFooter( '¿El numero de comandos no cuadra con la lista? !Hay Comandos Ocultos¡' );

	client.categories.forEach( ( category ) => {
		printCategory( client, msg, embed, category );
	} );

	sendMsg( msg, embed );
};

export default {
	name: 'commands',
	alias: ['cmd', 'cmds'],
	category: 'bot',
	usage: '',
	description: '',
	req: {
		args: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		await commandMessage( client, msg );
		msg.delete().catch( () => {} );
	},
};
