import Discord from 'discord.js';

import './configServer';
import * as Util from './data/util';

const start = async () => {
	const login = await Util.getLogin();

	const client = new Discord.Client();

	client.on( 'ready', () => {
		console.log( 'Bot Listo papu' );
	} );

	client.login( login.password );
};

start();
