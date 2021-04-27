/* eslint-disable no-console */
import { MessageEmbed } from 'discord.js';

import { setMsgTicket } from '../../db/ticket';

const descriptionTicket = async ( channel, user ) => {
	const embed = new MessageEmbed();

	embed.setColor( '#126554' );
	embed.setTimestamp();
	embed.setTitle( 'TICKET | ColdBot' );
	embed.setDescription(
		`<@${user.id}> tu ticket ha sido solicitado. Reacciona a "❌" para cerrar el Ticket.\n\nLos Administradores tambien podran eliminar tu Ticket`
	);

	channel.send( embed ).then( ( msg ) => {
		msg.react( '❌' );
	} );
};

export const createTicket = async ( msg, user ) => {
	const nameUser = user.username.toLowerCase();

	const canal = await msg.guild.channels.cache.find(
		( c ) => c.name === `ticket-${ nameUser }`
	);
	if ( canal ) return;

	msg.guild.channels.create( `ticket-${ nameUser }`,
		{
			reason: 'Ticket',
			permissionOverwrites: [
				{
					id: user.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
				},
				{
					id: msg.guild.roles.everyone,
					deny: ['VIEW_CHANNEL']
				}
			],
			type: 'text'
		} ).then( ( channel ) => {
		descriptionTicket( channel, user );
	} );
};

const description = async () => {
	const embed = new MessageEmbed();

	embed.setColor( '#126554' );
	embed.setTimestamp();
	embed.setTitle( 'SOPORTE | ColdBot' );
	embed.setDescription( '`Reacciona a este mensaje, para abrir un Ticket.`\n\nRecuerden que solo Puede Haber un Maximo de 1 Ticket abierto por persona.' );

	return embed;
};

export default {
	name: 'ticket setup',
	alias: ['ticket'],
	description: 'No requiere parametros',
	req: {
		args: 0,
		enable: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, msg, _args ) => {
		const embed = await description( client );

		msg.channel.send( embed ).then( async ( msgEmbed ) => {
			await setMsgTicket( msg, msgEmbed.id );
			msgEmbed.react( '📩' );
		} );

		msg.delete();
	},
};
