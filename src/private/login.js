import { WebhookClient } from 'discord.js';

export const password = process.env.PASSWORD;
export const webhookId = process.env.WEBHOOKID;
export const webhookToken = process.env.WEBHOOKTOKEN;

export const connectWelcome = () => {
	const hook = new WebhookClient( webhookId, webhookToken );
	return hook;
};
