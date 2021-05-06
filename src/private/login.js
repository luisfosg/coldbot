import { WebhookClient } from 'discord.js';

export const password = process.env.PASSWORD;
export const webhookIdWelcome = process.env.WEBHOOKIDWELCOME;
export const webhookTokenWelcome = process.env.WEBHOOKTOKENWELCOME;
export const webhookIdLogs = process.env.WEBHOOKIDLOGS;
export const webhookTokenLogs = process.env.WEBHOOKTOKENLOGS;

export const connectWelcome = () => {
	const hook = new WebhookClient( webhookIdWelcome, webhookTokenWelcome );
	return hook;
};

export const connectLogs = () => {
	const hook = new WebhookClient( webhookIdLogs, webhookTokenLogs );
	return hook;
};
