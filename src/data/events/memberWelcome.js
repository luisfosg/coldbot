import { MessageEmbed } from 'discord.js';

import { zeewWelcome } from '../functions/zeewImages';
import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin } from '../util';

const welcomeNormal = ( member ) => {
	const message = `Bienvenido ${ member } al Servidor ${ member.guild.name }!!`;
	sendWelcome( message );
};

export default {
	name: 'guildMemberAdd',
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
			embed.setDescription( `${ member } ha entrado al Servidor ${member.guild.name}.` );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		if ( login.zeewToken ) {
			member.send( `${member} Holaaa, Bienvenid@ a ${member.guild.name}.` );
			zeewWelcome( member, login.zeewToken );
		} else {
			welcomeNormal( member );
		}
	},
};
