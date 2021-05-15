import { getMsgTicket } from '../../db/ticket';
import { createTicket } from '../commands/2_admin/tickets';

export default {
	name: 'messageReactionAdd',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, reaction, user ) => {
		if ( user.bot ) return;
		const cmdTicket = client.commands.get( 'ticket' ) || client.commands.find( ( c ) => c.alias.includes( 'ticket' ) );
		if ( !cmdTicket ) return;

		const msgId = await getMsgTicket( reaction.message );

		/* Verifica La Existencia de Tickets */
		if ( reaction.message.id === msgId && reaction.emoji.name === '📩' ) {
			createTicket( reaction.message, user );
			reaction.users.remove( user );
		}
		/* Elimina los Tickets */
		if ( reaction.message.channel.name.startsWith( 'ticket-' ) && reaction.emoji.name === '❌' ) {
			reaction.message.channel.delete().catch( () => {} );
		}
	},
};
