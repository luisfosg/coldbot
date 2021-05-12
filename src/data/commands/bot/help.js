import { MessageEmbed } from 'discord.js';

import { sendMsg } from '../../util';

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setTimestamp( Date.now() );
	embed.setTitle( 'Lista de Comandos' );
	embed.setAuthor( msg.author.username, msg.author.avatarURL() );

	embed.setDescription(
		`Para ver una descripción mas detallada del Comando use: \n\`${
			client.splitStrings.status ? `${client.prefix}h ${client.splitStrings.value }` : `${client.prefix}h`
		} <comando>\``
	);

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

	return embed;
};

const helpMessage = async ( client ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setDescription(
		`Hola, El prefix es \`${ client.prefix }\` ${
			client.splitStrings.status ? `, y el separador de argumentos es \`${ client.splitStrings.value }\`` : ''
		}`
	);

	return embed;
};

const helpCommand = async ( client, msg, commandArg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#40C6CB' );
	embed.setTimestamp( Date.now() );

	// eslint-disable-next-line max-len
	const command = client.commands.get( commandArg ) || client.commands.find( ( c ) => c.alias.includes( commandArg ) );
	if ( !command || !command.req.visible ) {
		embed.setTitle( 'Comando No Encontrado.' );
		return sendMsg( msg, embed );
	}

	embed.setFooter( `Categoria: ${ command.category }` );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setTitle( `\`Comando: ${ command.name }\`` );
	embed.addField( 'Alias', `${command.alias.map( ( a ) => ` \`${ a }\`` )}` );
	embed.addField( 'Descripción', command.description === '' ? '`No Asignado`' : `\`${ command.description }\`` );
	embed.addField( 'Uso', command.usage === '' ? '`No Asignado`' : command.usage );
	embed.setDescription(
		`
		Argumentos Minimos Solicitados: **${ command.req.args }**\n
		${ command.req.dm ? 'Este comando se puede usar en MD (dm)' : 'Este comando no se puede usar en MD (dm)' }
		${ command.req.permissions.length > 0 ? 'Este comando requiere algunos permisos para su uso' : 'Este comando es libre de permisos' }
		`
	);

	sendMsg( msg, embed );
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

		if ( args[0] ) return helpCommand( client, msg, args[0] );

		embed = await helpMessage( client );
		sendMsg( msg, embed );

		embed = await commandMessage( client, msg );
		sendMsg( msg, embed );

		msg.delete().catch( () => {} );
	},
};
