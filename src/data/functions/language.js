import { language } from '../configDiscord';
import { getLanguage } from '../../db/language';

const guildLanguages = [];

export async function loadLanguages( client ) {
	for ( const guild of client.guilds.cache ) {
		const guildId = guild[0];

		const result = await getLanguage( guildId );

		guildLanguages[guildId] = result;
	}
}

export async function setLanguageUtil( guild, language ) {
	guildLanguages[guild.id] = language.toUpperCase();
}

export const languageChannel = ( client, guild ) => {
	let selectedLanguage = guildLanguages[guild.id];

	if ( !selectedLanguage ) selectedLanguage = language.toUpperCase();
	const lang = client.languages.get( selectedLanguage ) || client.languages.get( 'EN' );

	return lang;
};

export default languageChannel;
