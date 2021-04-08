/* eslint-disable no-console */
import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';

import './configServer';
import * as Util from './data/util';

const start = async () => {
	const login = await Util.getLogin();

	const client = new Discord.Client();

	client.commands = new Discord.Collection();
	const commandFiles = fs.readdirSync( path.join( __dirname, 'data/commands' ) ).filter( ( file ) => file.endsWith( '.js' ) );
	for ( const file of commandFiles ) {
		const command = await import( `./data/commands/${file}` );
		client.commands.set( command.name, command );
	}

	client.on( 'ready', () => {
		console.log( 'Bot Listo papu' );
	} );

	client.login( login.password );
};

start();
