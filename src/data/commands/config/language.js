import { sendEmbed } from '../../util';
import { setLanguage, getLanguage } from '../../../db/language';
import { setLanguageUtil, languageChannel } from '../../functions/language';

export default {
	name: 'setlanguage',
	alias: ['setlang', 'lang', 'language'],
	category: 'config',
	usage: ( langs, p, s ) => langs.language.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.language.description,
	req: {
		minArgs: 0,
		cooldown: 20,
		dm: 'not',
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const lang = languageChannel( { guild: msg.guild } );

		if ( !args[0] ) {
			sendEmbed( {
				place: msg.channel,
				text: lang.language.selected.replace( '{{ lang }}', await getLanguage( msg.guild.id ) ),
				deleteTime: 20
			} );

			sendEmbed( {
				place: msg.channel,
				title: lang.language.title,
				text: client.languages.map( ( l ) => `\`${ l.languageName }\`` ),
				deleteTime: 20
			} );

			return;
		}

		args[0] = args[0].toUpperCase();
		if ( !client.languages.has( args[0] ) ) {
			sendEmbed( { place: msg.channel, text: lang.language.notFound } );
		}

		setLanguage( msg, args[0] );
		setLanguageUtil( msg.guild, args[0] );
		sendEmbed( {
			place: msg.channel,
			text: lang.language.chosenOne.replace( '{{ lang }}', args[0] ),
			deleteTime: 20
		} );
	},
};
