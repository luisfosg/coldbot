/* eslint-disable new-cap */
import { db } from './configDb';

import { getConfig } from '../data/util';

const dbLanguage = new db.table( 'language' );

export const getLanguage = async ( msg ) => {
	const config = await getConfig();

	if ( !msg.guild ) return false;

	if ( !dbLanguage.has( `${ msg.guild.id }` ) ) {
		dbLanguage.set( `${ msg.guild.id }`, config.language );
	}
	const language = dbLanguage.get( `${ msg.guild.id }` );

	return language;
};

export const setLanguage = async ( msg, language ) => {
	dbLanguage.set( `${ msg.guild.id }`, language );
};
