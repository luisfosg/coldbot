/* eslint-disable no-console */
import { WebhookClient } from 'discord.js';

export const password = process.env.PASSWORD;
export const idServer = process.env.IDSERVER;
export const zeewToken = process.env.ZEEW;

const webhookLogs = process.env.WEBHOOKLOGS;
const webhookWelcome = process.env.WEBHOOKWELCOME;

const welcomeHook = webhookWelcome.split( '/' ).slice( 5, 7 );
const logsHook = webhookLogs.split( '/' ).slice( 5, 7 );

export const connectWelcome = () => {
	const hook = new WebhookClient( welcomeHook[0], welcomeHook[1] );
	return hook;
};

export const connectLogs = () => {
	const hook = new WebhookClient( logsHook[0], logsHook[1] );
	return hook;
};
