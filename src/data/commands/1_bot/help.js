import { MessageEmbed } from 'discord.js';

import { sendMsg, getLink } from '../../util';

const helpMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#E58249' );
	embed.setAuthor( client.user.username, client.user.avatarURL() );
	embed.setDescription(
		`Hola, El prefix es \`${ client.prefix }\` ${
			client.splitStrings.status ? `, y el separador de argumentos es \`${ client.splitStrings.value }\`` : ''
		}
		\n:small_blue_diamond:Para ver los comandos usa el comando \`cmds\`
		:small_blue_diamond:Para ver una descripción mas detallada del Comando use: \`${client.splitStrings.status ? `${client.prefix}h ${client.splitStrings.value }` : `${client.prefix}h`} <comando>\`
		`
	);

	embed.addField(
		'Links',
		`
		:snowflake: [Servidor de Soporte](https://discord.gg/y6jrugZUxe)
		:snowflake: [Invitame a tu servidor](${getLink( client )})
		`
	);

	sendMsg( msg, embed );
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

	embed.setFooter( `Categoria: ${ command.category }`, msg.author.avatarURL() );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setTitle( `\`Comando: ${ command.name }\`` );
	embed.addField( 'Alias', `${command.alias.map( ( a ) => ` \`${ a }\`` )}` );
	embed.addField( 'Descripción', command.description === '' ? '`No Asignado`' : `\`${ command.description }\`` );
	embed.addField( 'Uso', command.usage === '' ? '`No Asignado`' : `\`${ command.usage }\`` );
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
	usage: 'no',
	description: 'no',
	req: {
		args: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
		if ( args[0] ) {
			helpCommand( client, msg, args[0] );
		} else {
			await helpMessage( client, msg );
		}

		msg.delete().catch( () => {} );
	},
};
