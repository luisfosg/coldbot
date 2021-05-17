import { MessageEmbed } from 'discord.js';
import { async } from 'regenerator-runtime';

import { getMsgTicket, setMsgTicket } from '../../../db/ticket';

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

const createCategory = async ( msg, name ) => {
	const channel = await msg.guild.channels.create( name, {
		reason: 'Ticket Category',
		type: 'category'
	} );

	return channel;
};

export const createTicket = async ( msg, user ) => {
	let nameUser = user.username.trim().toLowerCase().replace( /\s+/g, '' );
	nameUser += `⚪${user.discriminator}`;

	const canal = await msg.guild.channels.cache.find(
		( c ) => c.name === `ticket-${ nameUser }`
	);
	if ( canal ) return;

	let categoryTicket = await msg.guild.channels.cache.find( ( ch ) => ch.name === '📨 Tickets' );
	if ( !categoryTicket ) categoryTicket = await createCategory( msg, '📨 Tickets' );

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
			type: 'text',
			parent: categoryTicket
		} ).then( ( channel ) => {
		descriptionTicket( channel, user );
	} );
};

const description = async ( msg ) => {
	const msgId = await getMsgTicket( msg );
	await msg.channel.messages.fetch( msgId ).then( ( msgTicket ) => {
		msgTicket.delete();
	} ).catch( () => {} );

	const embed = new MessageEmbed();

	embed.setColor( '#126554' );
	embed.setTimestamp();
	embed.setTitle( 'SOPORTE | ColdBot' );

	embed.setDescription( '@everyone `Reacciona con un `📩`, para abrir un Ticket.`\n\nRecuerden que solo Puede Haber un Maximo de 1 Ticket abierto por persona.' );

	return embed;
};

const deleteDescription = async ( msg ) => {
	const msgId = await getMsgTicket( msg );
	await msg.channel.messages.fetch( msgId ).then( ( msgTicket ) => {
		msgTicket.delete();
	} ).catch( () => {} );

	const embed = new MessageEmbed();

	embed.setColor( '#126554' );
	embed.setTimestamp();
	embed.setTitle( 'SOPORTE | ColdBot' );
	embed.setDescription( '`Por el momento las ayudas estan deshabilitadas.`' );

	msg.channel.send( embed ).then( async ( msgEmbed ) => {
		await setMsgTicket( msg, msgEmbed.id );
	} );

	msg.delete();
};

export default {
	name: 'ticket',
	alias: ['ticket-setup'],
	category: 'admin',
	usage: ( langs ) => langs.ticket.usage,
	description: ( langs ) => langs.ticket.description,
	req: {
		args: 0,
		cooldown: 0,
		dm: false,
		enable: true,
		visible: true,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( _client, msg, args ) => {
		if ( args[0] === 'close' ) return deleteDescription( msg );

		const embed = await description( msg );

		msg.channel.send( embed ).then( async ( msgEmbed ) => {
			await setMsgTicket( msg, msgEmbed.id );
			msgEmbed.react( '📩' );
		} );

		msg.delete();
	},
};
