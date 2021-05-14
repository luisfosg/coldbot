import { Client } from 'discord.js';

import './configServer';

import { getLogin } from './data/util';

import { importEvents } from './handlers/events';
import { importCommands } from './handlers/commands';
import { importLanguages } from './handlers/languages';

const start = async () => {
	const login = await getLogin();

	const client = new Client( { disableEveryone: false } );

	importLanguages( client );
	importCommands( client );
	importEvents( client );

	client.login( login.password ).catch( () => {
		// eslint-disable-next-line no-console
		console.log( 'Ocurrio Un Error al Loggearse Verifica El Password o Internet :X' );
	} );
};

start();
