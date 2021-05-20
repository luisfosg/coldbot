/* eslint-disable new-cap */
import { db } from './configDb';

const dbCooldown = new db.table( 'cooldown' );

export const getCooldown = async ( msg, string ) => {
	if ( !dbCooldown.has( `${ msg.guild.id }` ) ) {
		return false;
	}

	if ( dbCooldown.get( `${ msg.guild.id }` ).includes( string ) ) {
		return dbCooldown.get( `${ msg.guild.id }` );
	}
	return false;
};

export const setCooldown = async ( msg, string ) => {
	dbCooldown.push( msg.guild.id, string );
};

export const deleteCooldown = async ( msg, string ) => {
	const array = dbCooldown.all();
	array.forEach( ( element ) => {
		if ( element.ID === msg.guild.id ) {
			element.data.splice( element.data.indexOf( string ), 1 );
			dbCooldown.set( msg.guild.id, element.data );
		}
	} );
};
