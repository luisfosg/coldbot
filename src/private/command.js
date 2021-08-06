/* eslint-disable no-console */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { password } from './login';

const commands = [{
	name: 'saludo',
	description: 'te saluda el bot'
}];

const rest = new REST( { version: '9' } ).setToken( password );

( async () => {
	try {
		console.log( 'Started refreshing application (/) commands.' );
		await rest.put(
			Routes.applicationGuildCommands( '830175052959187015', '670071956204290078' ),
			{ body: commands },
		);
		console.log( 'Successfully reloaded application (/) commands.' );
	} catch ( error ) {
		console.error( error );
	}
} )();
