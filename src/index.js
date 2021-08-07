/* eslint-disable no-console */
import { Client, Collection } from 'discord.js';

import './configServer';
import './interactionCommand';

import { password } from './private/login';
import { intents } from './private/intents';

import { importEvents } from './handlers/events';
import { importCommands } from './handlers/commands';
import { importLanguages } from './handlers/languages';
import { importFonts } from './handlers/fonts';

import language from './data/functions/language';

const client = new Client( {
	intents
} );

client.guildSettings = new Collection();

client.on( 'interactionCreate', async ( interaction ) => {
	if ( !interaction.isCommand() ) return;
	if ( interaction.commandName === 'ping' ) {
		await interaction.reply( 'Hi' );
	}
} );

importLanguages( client ).then( () => {
	const lang = language( { client } );

	importEvents( client, lang );
	importCommands( client, lang );
	importFonts( client );
} );

client.login( password );
