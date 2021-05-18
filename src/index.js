import { Client } from 'discord.js';

import './configServer';

import { getLogin } from './data/util';

import { importEvents } from './handlers/events';
import { importCommands } from './handlers/commands';
import { importLanguages } from './handlers/languages';

import language from './data/functions/language';

const start = async () => {
	const login = await getLogin();

	const client = new Client( { disableEveryone: false } );

	await importLanguages( client );
	const lang = language( client );

	await importEvents( client, lang );
	await importCommands( client, lang );

	client.login( login.password ).catch( () => {
		// eslint-disable-next-line no-console
		console.log( lang.init.error );
	} );
};

start();
