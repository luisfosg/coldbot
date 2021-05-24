import { MessageEmbed } from 'discord.js';

import { sendMsg, getLink, color } from '../../util';

import language from '../../functions/language';

let lang;

const helpMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( color() );
	embed.setAuthor( client.user.username, client.user.avatarURL() );
	embed.setDescription(
		lang.help.text.replace(
			/{{ prefix }}/g, client.prefix
		).replace(
			'{{ text1 }}', client.splitStrings.status ? lang.help.complements.complement1.replace( '{{ value }}', client.splitStrings.value ) : ''
		)
	);

	embed.addField(
		lang.help.titleLink, lang.help.links.replace( '{{ link }}', getLink( client ) )
	);

	sendMsg( msg, embed );
};

const helpCommand = async ( client, msg, commandArg ) => {
	const embed = new MessageEmbed();

	embed.setColor( color() );
	embed.setTimestamp( Date.now() );

	// eslint-disable-next-line max-len
	const command = client.commands.get( commandArg ) || client.commands.find( ( c ) => c.alias.includes( commandArg ) );
	if ( !command || !command.req.visible ) {
		embed.setTitle( lang.help.notFound );
		return sendMsg( msg, embed );
	}

	embed.setFooter( lang.help.category.replace( '{{ category }}', command.category ), msg.author.avatarURL() );
	embed.setTitle( lang.help.name.replace( '{{ command }}', command.name ) );
	embed.addField( lang.help.alias, `${command.alias.map( ( a ) => ` \`${ a }\`` )}` );
	embed.addField( lang.help.descripCommand, `\`${ command.description( lang ) }\`` );
	embed.addField( lang.help.usageCommand, `\`${ command.usage( lang ) }\`` );

	embed.setDescription(
		lang.help.settingsCommand.replace(
			'{{ args }}', command.req.minArgs
		).replace(
			'{{ md }}', command.req.dm ? lang.help.complements.complement4 : lang.help.complements.complement5
		).replace(
			'{{ permissions }}', command.req.permissions.length > 0 ? lang.help.complements.complement2 : lang.help.complements.complement3
		).replace(
			'{{ cooldown }}', lang.help.complements.complement6.replace( '{{ seg }}', command.req.cooldown )
		)
	);

	sendMsg( msg, embed );
};

export default {
	name: 'help',
	alias: ['h'],
	category: 'bot',
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
	run: async ( client, msg, args ) => {
		lang = language( client, msg.guild );

		if ( args[0] ) {
			helpCommand( client, msg, args[0] );
		} else {
			await helpMessage( client, msg );
		}

		msg.delete().catch( () => {} );
	},
};
