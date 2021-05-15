import { sendMsg, getConfig } from '../util';

import { getPrefix } from '../../db/prefix';
import { getSplit } from '../../db/splitString';

import { checkArgs, checkMd, divideArgs } from '../functions/checkArgs';
import { checkPermissions } from '../functions/checkPermissions';

const checkCommand = async ( client, msg, CMD, args ) => {
	const config = await getConfig();
	const commandFind = client.commands.get( CMD );

	const isMd = checkMd( commandFind.req.dm, msg.channel.type );
	if ( !isMd ) return msg.reply( 'El Comando no se puede usar en  MD (dm)' );

	const isPermitValid = await checkPermissions( msg, commandFind.req.permissions );
	if ( !isPermitValid ) return msg.reply( 'No Posee los Permisos Necesarios.' );

	const isArgsValid = await checkArgs( commandFind.req.args, args.length );
	if ( !isArgsValid ) return msg.reply( `Faltan Argumentos, Uso del Comando: ${ commandFind.usage }` );

	try {
		commandFind.run( client, msg, args );
	} catch ( e ) {
		msg.reply( `A Ocurrido un Error Contacta al Administrador: <@${ config.devs[0] }>` );
	}
};

const mentionPrefix = async ( client, msg ) => {
	if ( msg.content.startsWith( client.prefix ) ) {
		const args = await divideArgs( client, msg.content, client.prefix );
		let CMD = args.shift().toLowerCase();

		if ( client.commands.find( ( c ) => c.alias.includes( CMD ) ) ) {
			const com = client.commands.find( ( c ) => c.alias.includes( CMD ) );
			CMD = com.name;
		}

		if ( !client.commands.has( CMD ) ) {
			return;
		}

		checkCommand( client, msg, CMD, args );
	}
};

const mentionBot = async ( client, msg ) => {
	if ( msg.content.startsWith( `<@!${client.user.id}>` ) ) {
		if ( msg.content === `<@!${client.user.id}>` ) {
			sendMsg( msg, `Hola, El Prefix es: \`${ client.prefix }\` \nusa \`${ client.prefix }h\` para saber mas` );
			return;
		}

		const data = `<@!${client.user.id}>`;
		const args = msg.content.slice( data.length ).trim().split( / +/ );
		args.unshift( client.prefix );
		msg.content = args.join( ' ' );
	}
};

export default {
	name: 'message',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, msg ) => {
		if ( msg.author.bot ) return;

		client.prefix = await getPrefix( msg );
		client.splitStrings = await getSplit( msg );

		mentionBot( client, msg );
		mentionPrefix( client, msg );
	},
};
