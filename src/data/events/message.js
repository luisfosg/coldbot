import { sendEmbed, sendMsg, getConfig } from '../util';
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

	if ( msg.guild ) {
		const havePermissions = await checkPermissions( msg.guild.me, commandFind.req.necessary );
		if ( !havePermissions ) {
			return sendEmbed( {
				place: msg.channel,
				text: `\`\`\`${ commandFind.req.necessary.map( ( cmd ) => `${ cmd }` ).join( ', ' ) }\`\`\``,
				title: lang.message.notHavePermissions,
				deleteTime: 5
			} );
		}
	}

	const isMd = checkMd( commandFind.req.dm, msg.channel.type );
	if ( !isMd ) return sendMsg( { place: msg, text: lang.message.notMd, reply: true } );

	const isPermitValid = await checkPermissions( msg.member, commandFind.req.permissions );
	if ( !isPermitValid ) {
		return sendEmbed( {
			place: msg.channel,
			title: lang.message.invalidPermissions,
			text: `\`\`\`${ commandFind.req.permissions.map( ( cmd ) => `${ cmd }` ).join( ', ' ) }\`\`\``,
			deleteTime: 5
		} );
	}

	const isArgsValid = await checkArgs( commandFind.req.minArgs, args.length );
	if ( !isArgsValid ) {
		return sendEmbed( {
			place: msg.channel,
			text: lang.message.invalidArgs.replace(
				'{{ usage }}', commandFind.usage( lang, client.prefix, splDes( msg.guild ) )
			),
			deleteTime: 5
		} );
	}

	const notCooldown = cooldown( msg.author, commandFind.name, commandFind.req.cooldown );
	if ( !notCooldown ) {
		return sendMsg( {
			place: msg,
			text: lang.message.cooldown.replace( '{{ seg }}', commandFind.req.cooldown ),
			reply: true,
			deleteTime: 5
		} );
	}

	try {
		commandFind.run( client, msg, args );
	} catch ( e ) {
		sendMsg( {
			place: msg,
			text: lang.message.error.replace( '{{ dev }}', config.devs[0][0] ),
			reply: true,
			deleteTime: 5
		} );
	}
};

const verifySendMsg = async ( msg ) => {
	if ( !msg.guild.me.hasPermission( 'SEND_MESSAGES' ) ) {
		return sendEmbed( {
			place: msg.author,
			text: lang.message.notSendMsg,
			deleteTime: 30
		} );
	}

	if ( !msg.guild.me.hasPermission( 'EMBED_LINKS' ) ) {
		sendMsg( {
			place: msg.channel,
			text: lang.message.notSendEmbeds,
			deleteTime: 10
		} );
		return true;
	}
	return false;
};

const mentionPrefix = async ( client, msg ) => {
	if ( msg.content.startsWith( client.prefix ) ) {
		if ( msg.guild ) {
			const sendMsgChannel = await verifySendMsg( msg );
			if ( sendMsgChannel ) return false;
		}

		const stringArgs = await divideArgs( client, msg.content, client.prefix );
		let CMD = stringArgs[0];
		const args = stringArgs[1];

		if ( client.commands.find( ( c ) => c.alias.includes( CMD ) ) ) {
			const com = client.commands.find( ( c ) => c.alias.includes( CMD ) );
			CMD = com.name;
		}

		if ( !client.commands.has( CMD ) ) {
			return sendEmbed( {
				place: msg.channel,
				text: lang.general.commandNotFound,
				deleteTime: 5
			} );
		}

		checkCommand( client, msg, CMD, args );
	}
};

const mentionBot = async ( client, msg ) => {
	if ( msg.content.startsWith( `<@!${client.user.id}>` ) || msg.content.startsWith( `<@${client.user.id}>` ) ) {
		if ( msg.guild ) {
			const sendMsgChannel = await verifySendMsg( msg );
			if ( sendMsgChannel ) return false;
		}

		if ( msg.content === `<@!${client.user.id}>` || msg.content === `<@${client.user.id}>` ) {
			return sendEmbed( {
				place: msg.channel,
				text: lang.message.mentionBot.replace( /{{ prefix }}/g, client.prefix ),
				deleteTime: 10
			} );
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

		lang = language( client, msg.guild );
		client.prefix = await getPrefix( msg );
		client.splitStrings = await getSplit( msg );

		const isFalse = await mentionBot( client, msg );
		if ( !isFalse ) mentionPrefix( client, msg );
	},
};
