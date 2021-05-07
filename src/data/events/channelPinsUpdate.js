import { MessageEmbed } from 'discord.js';

import { sendLog } from '../web/hooks';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, channel, _time ) => {
		const { id, name } = channel;

		const embed = new MessageEmbed();
		embed.setTitle( '**[Mensaje Anclado]**' );
		embed.setColor( 'RED' );
		embed.setDescription( `Se actualizo un mensaje anclado en el canal <#${id}>` );
		embed.setTimestamp();
		embed.setFooter( name, channel.guild.iconURL() );

		sendLog( embed );
	},
};
