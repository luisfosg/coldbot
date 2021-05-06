import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/logshook';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, oldChannel, newChannel ) => {
		if ( !oldChannel.guild ) return;

		const embed = new MessageEmbed();

		embed.setTitle( '**[CANAL EDITADO]**' );
		embed.setColor( 'RED' );
		if ( oldChannel.name === newChannel.name ) {
			embed.setDescription( 'Se han editado los Permisos y Ajustes Generales' );
		} else {
			embed.setDescription( `\nNombre anterior: **${oldChannel.name}**\nNuevo nombre: **${newChannel.name}**\nCanal ID: **${oldChannel.id}**\n` );
		}
		embed.setTimestamp();
		embed.setFooter( oldChannel.guild.name, oldChannel.guild.iconURL() );

		sendLog( embed );
	},
};
