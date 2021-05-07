import { MessageEmbed } from 'discord.js';

import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin } from '../util';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, member ) => {
		const login = await getLogin();

		if ( member.guild.id !== login.idServer ) {
			const embed = new MessageEmbed();

			embed.setTitle( '**[Nuevo Miembro]**' );
			embed.setColor( 'RED' );
			embed.setDescription( `${ member } a entrado al Servidor ${member.guild.name}.` );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		const message = `Bienvenido ${ member } al Servidor ${ member.guild.name }!!`;
		sendWelcome( message );
	},
};
