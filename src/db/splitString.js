/* eslint-disable new-cap */
import db from 'quick.db';

import { getConfig } from '../data/util';

const dbSplitString = new db.table( 'splitString' );

export const getSplit = async ( msg ) => {
	const config = await getConfig();

	if ( !dbSplitString.has( `${ msg.guild.id }` ) ) {
		dbSplitString.set( `${ msg.guild.id }`, { status: config.splitStrings[0], value: config.splitStrings[1] } );
	}

	return dbSplitString.get( `${ msg.guild.id }` );
};

export const setSplit = async ( msg, status, splitString ) => {
	dbSplitString.set( `${ msg.guild.id }`, { status, splitString } );
};
