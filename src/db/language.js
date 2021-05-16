/* eslint-disable new-cap */
import { db } from './configDb';

import { getConfig } from '../data/util';

const dbLanguage = new db.table( 'language' );

export const getLanguage = async ( id ) => {
	const config = await getConfig();

	if ( !dbLanguage.has( `${ id }` ) ) {
		dbLanguage.set( `${ id }`, config.language.toUpperCase() );
	}
	const language = dbLanguage.get( `${ id }` );

	return language;
};

export const setLanguage = async ( msg, language ) => {
	dbLanguage.set( `${ msg.guild.id }`, language );
};
