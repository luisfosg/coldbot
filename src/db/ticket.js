/* eslint-disable new-cap */
import db from 'quick.db';

const dbPrefix = new db.table( 'ticket' );

export const getMsgTicket = async ( msg ) => dbPrefix.get( `${ msg.guild.id }` );

export const setMsgTicket = async ( msg, id ) => {
	dbPrefix.set( `${ msg.guild.id }`, id );
};
