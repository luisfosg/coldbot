/* eslint-disable no-continue */
/* eslint-disable no-console */
import Table from 'ascii-table';
import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export const importLanguages = async ( client ) => {
	client.languages = new Collection();

	const table = new Table( 'Lenguajes' );
	table.setHeading( 'Lenguaje', 'Estado de Carga' );

	for ( const languageFile of readdirSync( join( __dirname, '../../lang' ) ) ) {
		if ( !languageFile.includes( '.json' ) ) continue;

		const languageArray = languageFile.split( '-' );
		const language = await import( `../../lang/${ languageFile }` );
		client.languages.set( languageArray[0], language.default );

		table.addRow( languageFile, '✅' );
	}

	console.log( table.toString() );
};
