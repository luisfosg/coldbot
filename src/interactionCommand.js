/* eslint-disable no-console */
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import { password } from './private/login';

const idBot = '879088469362753556';
const idServer = '670071956204290078';

const commands = [{
	name: 'ping',
	description: 'Ping del bot'
}];

const rest = new REST( { version: '9' } ).setToken( password );

( async () => {
	try {
		console.log( 'Started refreshing application (/) commands.' );
		await rest.put(
			Routes.applicationGuildCommands( idBot, idServer ),
			{ body: commands },
		);
		console.log( 'Successfully reloaded application (/) commands.' );
	} catch ( error ) {
		console.error( error );
	}
} )();
