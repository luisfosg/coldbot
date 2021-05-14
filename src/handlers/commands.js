/* eslint-disable no-console */
/* eslint-disable no-continue */
import Ascii from 'ascii-table';
import { join } from 'path';
import { Collection } from 'discord.js';
import { readdirSync } from 'fs';

const verifyStructure = ( table, command, commandFile ) => {
	const attributes = ['name', 'alias', 'req', 'category', 'usage', 'description', 'run'];
	const reqs = ['args', 'dm', 'enable', 'visible', 'permissions'];

	for ( const attribute of attributes ) {
		if ( !command[attribute] ) {
			table.addRow( commandFile, `❌ -> No tiene el atributo "${ attribute }"` );
			return false;
		}
	}
	for ( const req of reqs ) {
		if ( command.req[req] === undefined ) {
			table.addRow( commandFile, `❌ -> "req" No tiene el atributo "${ req }"` );
			return false;
		}
	}
	if ( !command.req.enable ) {
		table.addRow( commandFile, '⚠ -> Comando Deshabilitado' );
		return false;
	}

	return true;
};

export const importCommands = async ( client ) => {
	client.commands = new Collection();
	client.categories = [];

	const table = new Ascii( 'Commands' );
	table.setHeading( 'Command', ' Load status' );

	for ( const subfolder of readdirSync( join( __dirname, '../data/commands' ) ) ) {
		for ( const commandFile of readdirSync( join( __dirname, `../data/commands/${ subfolder }` ) ) ) {
			const command = await import( `../data/commands/${ subfolder }/${ commandFile }` );

			const isValid = verifyStructure( table, command.default, commandFile );
			if ( !isValid ) continue;

			client.commands.set( command.default.name, command.default );

			if ( !client.categories.includes( command.default.category ) ) {
				client.categories.push( command.default.category );
			}

			if ( !command.default.req.visible ) {
				table.addRow( commandFile, '⛔ -> Comando Oculto' );
			} else {
				table.addRow( commandFile, '✅' );
			}
		}
	}

	console.log( table.toString() );
};
