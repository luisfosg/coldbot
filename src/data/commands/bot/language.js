import { MessageEmbed } from 'discord.js';

import { sendMsg, color } from '../../util';
import { setLanguage, getLanguage } from '../../../db/language';
import { setLanguageUtil, languageChannel } from '../../functions/language';

export default {
	name: 'setlanguage',
	alias: ['setlang', 'lang', 'language'],
	category: 'bot',
	usage: ( langs, p, s ) => langs.language.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.language.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const lang = languageChannel( client, msg.guild );

		if ( !args[0] ) {
			sendMsg( msg, lang.language.selected.replace( '{{ lang }}', await getLanguage( msg.guild.id ) ) );
			const embed = new MessageEmbed();

			embed.setTitle( lang.language.title );
			embed.setColor( color() );
			embed.setDescription(
				client.languages.map( ( l ) => `\`${ l.languageName }\`` )
			);

			sendMsg( msg, embed );
			return;
		}

		args[0] = args[0].toUpperCase();
		if ( !client.languages.has( args[0] ) ) return sendMsg( msg, lang.language.notFound );

		setLanguage( msg, args[0] );
		setLanguageUtil( msg.guild, args[0] );
		sendMsg( msg, lang.language.chosenOne.replace( '{{ lang }}', args[0] ) );
	},
};
