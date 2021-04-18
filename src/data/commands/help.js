import { MessageEmbed } from 'discord.js';

import { sendMsg, getConfig } from '../util';

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( 'RANDOM' );
	embed.setTitle( 'Lista de Comandos' );
	embed.setAuthor( msg.author.username, msg.author.avatarURL() );
	embed.setTimestamp( Date.now() );

	client.commands.map( ( c ) => embed.addField(
		`${ client.prefix } ${ c.name }`,
		`\`Alias:\`${ c.alias.map( ( a ) => `${ a } ` ) } \`Argumentos:\` ${ c.description }`
	) );

	return embed;
};

const helpMessage = async ( client ) => {
	const config = await getConfig();
	const embed = new MessageEmbed();

	embed.setColor( 'RANDOM' );
	if ( !config.splitStrings[0] ) return embed.setDescription( `Hola, El prefix es \`${ client.prefix }\`` );

	embed.setDescription(
		`Hola, El prefix es \`${ client.prefix }\`, y el separador de argumentos es \`${ config.splitStrings[1] }\``
	);

	return embed;
};

export default {
	name: 'help',
	alias: ['h'],
	description: 'No requiere parametros',
	req: {
		args: 0,
		enable: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		let embed;

		embed = await helpMessage( client );
		sendMsg( msg, embed );

		embed = await commandMessage( client, msg );
		sendMsg( msg, embed );

		msg.delete();
	},
};
