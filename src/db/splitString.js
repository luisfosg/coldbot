/* eslint-disable new-cap */
import { db } from './configDb';

import { getConfig } from '../data/util';

const dbSplitString = new db.table( 'splitString' );

export const getSplit = async ( msg ) => {
	const config = await getConfig();

	if ( msg.channel.type === 'dm' ) return { status: config.splitStrings[0], value: config.splitStrings[1] };

	if ( !dbSplitString.has( `${ msg.guild.id }` ) ) {
		dbSplitString.set( `${ msg.guild.id }`, { status: config.splitStrings[0], value: config.splitStrings[1] } );
	}

	return dbSplitString.get( `${ msg.guild.id }` );
};

export const setSplit = async ( msg, status, value ) => {
	dbSplitString.set( `${ msg.guild.id }`, { status, value } );
};
