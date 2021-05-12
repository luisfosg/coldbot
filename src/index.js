/* eslint-disable no-continue */
import Discord from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

import './configServer';

import { getLogin } from './data/util';

const importLanguages = async ( client ) => {
	client.languages = new Discord.Collection();

	for ( const languageFile of readdirSync( path.join( __dirname, '../lang' ) ) ) {
		const languageArray = languageFile.split( '-' );
		const language = await import( `../lang/${ languageFile }` );
		client.languages.set( languageArray[0], language.default );
	}
};

const importCommands = async ( client ) => {
	client.commands = new Discord.Collection();

	for ( const subfolder of readdirSync( path.join( __dirname, 'data/commands' ) ) ) {
		for ( const commandFile of readdirSync( path.join( __dirname, `data/commands/${ subfolder }` ) ) ) {
			const command = await import( `./data/commands/${ subfolder }/${ commandFile }` );

			if ( !command.default.req.enable ) continue;
			client.commands.set( command.default.name, command.default );
		}
	}
};

const importEvents = async ( client ) => {
	for ( const eventFile of readdirSync( path.join( __dirname, 'data/events' ) ) ) {
		const contentsFile = await import( `./data/events/${ eventFile }` );

		if ( !contentsFile.default.req.enable ) continue;

		const { once } = contentsFile.default.req;
		client[once ? 'once' : 'on']( contentsFile.default.name, contentsFile.default.run.bind( null, client ) );

		delete require.cache[require.resolve( `./data/events/${eventFile}` )];
	}
};

const start = async () => {
	const login = await getLogin();

	const client = new Discord.Client( { disableEveryone: false } );

	importLanguages( client );
	importCommands( client );
	importEvents( client );

	client.login( login.password ).catch( () => {
		// eslint-disable-next-line no-console
		console.log( 'Ocurrio Un Error al Loggearse Verifica El Password o Internet :X' );
	} );
};

start();
