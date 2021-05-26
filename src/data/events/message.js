import { MessageEmbed } from 'discord.js';

import { sendMsg, getConfig, color } from '../util';
import { getPrefix } from '../../db/prefix';
import { getSplit, splDes } from '../../db/splitString';

import { checkArgs, checkMd, divideArgs } from '../functions/checkArgs';
import { checkPermissions } from '../functions/checkPermissions';
import { cooldown } from '../functions/cooldown';

import language from '../functions/language';

let lang;

const checkCommand = async ( client, msg, CMD, args ) => {
	const config = await getConfig();
	const commandFind = client.commands.get( CMD );

	const isMd = checkMd( commandFind.req.dm, msg.channel.type );
	if ( !isMd ) return msg.reply( lang.message.notMd );

	const isPermitValid = await checkPermissions( msg, commandFind.req.permissions );
	if ( !isPermitValid ) {
		const embed = new MessageEmbed();

		embed.setColor( color() );
		embed.setTitle( lang.message.invalidPermissions );
		embed.setDescription( commandFind.req.permissions );

		return sendMsg( msg, embed );
	}

	const isArgsValid = await checkArgs( commandFind.req.minArgs, args.length );
	if ( !isArgsValid ) {
		const embed = new MessageEmbed();

		embed.setColor( color() );
		embed.setDescription(
			lang.message.invalidArgs.replace(
				'{{ usage }}', commandFind.usage( lang, client.prefix, splDes( msg.guild ) )
			)
		);

		return sendMsg( msg, embed );
	}

	const notCooldown = cooldown( msg.author, commandFind.name, commandFind.req.cooldown );
	if ( !notCooldown ) return msg.reply( lang.message.cooldown.replace( '{{ seg }}', commandFind.req.cooldown ) );

	try {
		commandFind.run( client, msg, args );
	} catch ( e ) {
		msg.reply( lang.message.error.replace( '{{ dev }}', config.devs[0][0] ) );
	}
};

const mentionPrefix = async ( client, msg ) => {
	if ( msg.content.startsWith( client.prefix ) ) {
		const stringArgs = await divideArgs( client, msg.content, client.prefix );
		let CMD = stringArgs[0];
		const args = stringArgs[1];

		if ( client.commands.find( ( c ) => c.alias.includes( CMD ) ) ) {
			const com = client.commands.find( ( c ) => c.alias.includes( CMD ) );
			CMD = com.name;
		}

		if ( !client.commands.has( CMD ) ) {
			const embed = new MessageEmbed();

			embed.setColor( color() );
			embed.setDescription( lang.general.commandNotFound );

			return sendMsg( msg, embed );
		}

		checkCommand( client, msg, CMD, args );
	}
};

const mentionBot = async ( client, msg ) => {
	lang = language( client, msg.guild );
	if ( msg.content.startsWith( `<@!${client.user.id}>` ) || msg.content.startsWith( `<@${client.user.id}>` ) ) {
		if ( msg.content === `<@!${client.user.id}>` || msg.content === `<@${client.user.id}>` ) {
			sendMsg( msg, lang.message.mentionBot.replace( /{{ prefix }}/g, client.prefix ) );
			return;
		}
		let data;

		// eslint-disable-next-line no-unused-expressions
		msg.content.startsWith( `<@${client.user.id}>` ) ? data = `<@${client.user.id}>` : data = `<@!${client.user.id}>`;

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
