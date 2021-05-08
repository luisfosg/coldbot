import { MessageEmbed, MessageAttachment } from 'discord.js';
import Zeew from 'zeew';

import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin } from '../util';

const zeewGoodbye = async ( member, token ) => {
	const wlc = new Zeew.Bienvenida();

	wlc.token( token );
	wlc.estilo( 'classic' );
	wlc.avatar( member.user.displayAvatarURL( { format: 'png' } ) );
	wlc.fondo( 'https://i.imgur.com/H80vUGI.png' );
	wlc.colorTit( '#FFF' );
	wlc.titulo( `${ member.displayName } Salió.` );
	wlc.colorDesc( '#FFF' );
	wlc.descripcion( '!Hasta Luego¡' );

	const img = await Zeew.WelcomeZeew( wlc );
	const att = new MessageAttachment( img, 'zeewapi-img.gif' );

	sendWelcome( att );
};

const goodbyeNormal = ( member ) => {
	const message = `Hasta Luego ${ member } B)`;
	sendWelcome( message );
};

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, member ) => {
		const login = await getLogin();

		if ( member.guild.id !== login.idServer ) {
			const embed = new MessageEmbed();

			embed.setTitle( '**[Salio un Miembro]**' );
			embed.setColor( 'RED' );
			embed.setDescription( `${ member } salió del Servidor ${member.guild.name}.` );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		if ( login.zeewToken ) {
			zeewGoodbye( member, login.zeewToken );
		} else {
			goodbyeNormal( member );
		}
	},
};
