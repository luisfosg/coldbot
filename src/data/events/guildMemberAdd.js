import { MessageEmbed, MessageAttachment } from 'discord.js';
import Zeew from 'zeew';

import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin } from '../util';

const zeewWelcome = async ( member, token ) => {
	const wlc = new Zeew.Bienvenida();

	wlc.token( token );
	wlc.estilo( 'classic' );
	wlc.avatar( member.user.displayAvatarURL( { format: 'png' } ) );
	wlc.fondo( 'https://i.imgur.com/mNzTrxn.png' );
	wlc.colorTit( '#FFF' );
	wlc.titulo( `Bienvenido ${ member.displayName }` );
	wlc.colorDesc( '#FFF' );
	wlc.descripcion( `Al Servidor ${ member.guild.name }` );

	const img = await Zeew.WelcomeZeew( wlc );
	const att = new MessageAttachment( img, 'zeewapi-img.gif' );

	sendWelcome( att );
};

const welcomeNormal = ( member ) => {
	const message = `Bienvenido ${ member } al Servidor ${ member.guild.name }!!`;
	sendWelcome( message );
};

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, member ) => {
		const login = await getLogin();

		/* Se verifica si se hace un Log, o se envia la Bienvenida */
		if ( member.guild.id !== login.idServer ) {
			const embed = new MessageEmbed();

			embed.setTitle( '**[Nuevo Miembro]**' );
			embed.setColor( 'RED' );
			embed.setDescription( `${ member } a entrado al Servidor ${member.guild.name}.` );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		if ( login.zeewToken ) {
			zeewWelcome( member, login.zeewToken );
		} else {
			welcomeNormal( member );
		}
	},
};
