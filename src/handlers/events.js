/* eslint-disable no-console */
/* eslint-disable no-continue */
import Table from 'ascii-table';
import { readdirSync } from 'fs';
import { join } from 'path';

const attributes = ['name', 'req', 'run'];
const reqs = ['once', 'enable'];
const areFunctions = ['run'];

const verifyStructure = ( table, event, eventFile ) => {
	for ( const attribute of attributes ) {
		if ( !event[attribute] ) {
			table.addRow( eventFile, `❌ -> No tiene el atributo "${ attribute }"` );
			return false;
		}
	}
	for ( const req of reqs ) {
		if ( event.req[req] === undefined ) {
			table.addRow( eventFile, `❌ -> "req" No tiene el atributo "${ req }"` );
			return false;
		}
	}
	for ( const isFunction of areFunctions ) {
		if ( typeof event[isFunction] !== 'function' ) {
			table.addRow( eventFile, `❌ -> "${ isFunction }" no es una función` );
			return false;
		}
	}

	if ( !event.req.enable ) {
		table.addRow( eventFile, '⚠ -> Comando Deshabilitado' );
		return false;
	}

	return true;
};

export const importEvents = async ( client ) => {
	client.eventCount = 0;

	const table = new Table( 'Eventos' );
	table.setHeading( 'Evento', 'Estado de Carga' );

	for ( const eventFile of readdirSync( join( __dirname, '../data/events' ) ) ) {
		if ( !eventFile.includes( '.js' ) ) continue;
		const event = await import( `../data/events/${ eventFile }` );

		const isValid = verifyStructure( table, event.default, eventFile );
		if ( !isValid ) continue;

		const { once } = event.default.req;
		client[once ? 'once' : 'on']( event.default.name, event.default.run.bind( null, client ) );

		client.eventCount++;
		if ( once ) {
			table.addRow( eventFile, '⛔' );
		} else {
			table.addRow( eventFile, '✅' );
		}

		delete require.cache[require.resolve( `../data/events/${eventFile}` )];
	}

	console.log( table.toString() );
};
