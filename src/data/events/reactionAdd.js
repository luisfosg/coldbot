import { getMsgTicket } from '../../db/ticket';
import { createTicket } from '../commands/admin/tickets';

export default {
	name: 'messageReactionAdd',
	req: {
		once: false,
		enable: false,
	},
	run: async ( client, reaction, user ) => {
		if ( user.bot ) return;
		if ( !reaction.message.guild ) return;

		const cmdTicket = client.commands.get( 'ticket' ) || client.commands.find( ( c ) => c.alias.includes( 'ticket' ) );
		if ( !cmdTicket ) return;

		const msgId = await getMsgTicket( reaction.message );

		/* Verifica La Existencia de Tickets */
		if ( reaction.message.id === msgId && reaction.emoji.name === '📩' ) {
			createTicket( client, reaction.message, reaction.message.guild.member( user ) );
			reaction.users.remove( user );
		}
		/* Elimina los Tickets */
		if ( reaction.message.channel.name.startsWith( 'ticket-' ) && reaction.emoji.name === '❌' ) {
			reaction.message.channel.delete().catch( () => {} );
		}
	},
};
