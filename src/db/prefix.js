/* eslint-disable new-cap */
import db from 'quick.db';

import { getConfig } from '../data/util';

const dbPrefix = new db.table( 'prefix' );

export const getPrefix = async ( msg ) => {
	const config = await getConfig();
	let prefix;

	if ( !dbPrefix.has( `${ msg.guild.id }` ) ) {
		dbPrefix.set( `${ msg.guild.id }`, config.prefix );
		prefix = dbPrefix.get( `${ msg.guild.id }` );
	} else {
		prefix = dbPrefix.get( `${ msg.guild.id }` );
	}

	return prefix;
};

export const setPrefix = async ( msg, pref ) => {
	dbPrefix.set( `${ msg.guild.id }`, pref );
};
