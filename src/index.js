/* eslint-disable no-console */
import { Client, Collection } from 'discord.js';

import './configServer';
import './private/command';

import { password } from './private/login';
import { intents } from './private/intents';

const client = new Client( {
	intents
} );

client.guildSettings = new Collection();

client.once( 'ready', () => {
	console.log( `Logged in as ${client.user.tag}!` );
} );

client.on( 'interactionCreate', async ( interaction ) => {
	if ( !interaction.isCommand() ) return;
	if ( interaction.commandName === 'saludo' ) {
		await interaction.reply( 'Hi' );
	}
} );

client.login( password );
