import { WebhookClient } from 'discord.js';

export const password = process.env.PASSWORD;
export const idServer = process.env.IDSERVER;
export const zeewToken = process.env.ZEEW;
export const dbName = process.env.DBNAME;

const webhookLogs = process.env.WEBHOOKLOGS;
const webhookWelcome = process.env.WEBHOOKWELCOME;

let logsHook;
let welcomeHook;

if ( webhookLogs ) {
	logsHook = webhookLogs.split( '/' ).slice( 5, 7 );
}
if ( webhookWelcome ) {
	welcomeHook = webhookWelcome.split( '/' ).slice( 5, 7 );
}

export const connectWelcome = () => {
	if ( !welcomeHook ) return 'notWorking';
	const hook = new WebhookClient( welcomeHook[0], welcomeHook[1] );
	return hook;
};

export const connectLogs = () => {
	if ( !logsHook ) return 'notWorking';
	const hook = new WebhookClient( logsHook[0], logsHook[1] );
	return hook;
};
