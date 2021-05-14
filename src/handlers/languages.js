import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export const importLanguages = async ( client ) => {
	client.languages = new Collection();

	for ( const languageFile of readdirSync( join( __dirname, '../../lang' ) ) ) {
		const languageArray = languageFile.split( '-' );
		const language = await import( `../../lang/${ languageFile }` );
		client.languages.set( languageArray[0], language.default );
	}
};
