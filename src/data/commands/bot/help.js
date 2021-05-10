import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../../util';

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setTitle( 'Lista de Comandos' );
	embed.setAuthor( msg.author.username, msg.author.avatarURL() );
	embed.setTimestamp( Date.now() );

	const isdm = msg.channel.type;

	client.commands.map( ( c ) => {
		if ( ( isdm === 'dm' ) && !c.req.dm ) return false;
		if ( c.req.visible ) {
			return embed.addField(
				`${ client.prefix } ${ c.name }`,
				`>>> \`Alias:\`${ c.alias.map( ( a ) => ` ${ a }` ) } \`Argumentos:\` ${ c.description } \t`
			);
		}
		return false;
	} );

	return embed;
};

const helpMessage = async ( client ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	if ( !client.splitStrings.status ) return embed.setDescription( `Hola, El prefix es \`${ client.prefix }\`` );

	embed.setDescription(
		`Hola, El prefix es \`${ client.prefix }\`, y el separador de argumentos es \`${ client.splitStrings.value }\``
	);

	return embed;
};

export default {
	name: 'help',
	alias: ['h'],
	category: 'bot',
	usage: '',
	description: 'No requiere parametros',
	req: {
		args: 0,
		dm: true,
		enable: true,
		visible: false,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
		let embed;

		if ( args[0] ) return sendMsg( msg, args[0] );

		embed = await helpMessage( client );
		sendMsg( msg, embed );

		embed = await commandMessage( client, msg );
		sendMsg( msg, embed );

		msg.delete().catch( () => {} );
	},
};
