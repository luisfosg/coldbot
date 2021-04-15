/* eslint-disable no-continue */
import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

import './configServer';
import { getLogin } from './data/util';

const importCommands = async ( client ) => {
	client.commands = new Discord.Collection();

	const commandFiles = fs.readdirSync( path.join( __dirname, 'data/commands' ) ).filter( ( file ) => file.endsWith( '.js' ) );
	for ( const file of commandFiles ) {
		const command = await import( `./data/commands/${file}` );

		if ( !command.default.req.enable ) continue;

		client.commands.set( command.default.name, command.default );
	}
};

const importEvents = async ( client ) => {
	const eventFiles = fs.readdirSync( path.join( __dirname, 'data/events' ) ).filter( ( file ) => file.endsWith( '.js' ) );
	for ( const file of eventFiles ) {
		const nameFile = file.substring( 0, file.length - 3 );
		const contentsFile = await import( `./data/events/${file}` );

		if ( !contentsFile.default.req.enable ) continue;

		const { once } = contentsFile.default.req;
		client[once ? 'once' : 'on']( nameFile, contentsFile.default.run.bind( null, client ) );

		delete require.cache[require.resolve( `./data/events/${file}` )];
	}
};

const start = async () => {
	const login = await getLogin();

	const client = new Discord.Client();

	importCommands( client );
	importEvents( client );

	client.login( login.password );
};

start();
