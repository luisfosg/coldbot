/* eslint-disable no-console */
import { MessageAttachment } from 'discord.js';
import Zeew from 'zeew';

import { sendWelcome } from '../web/hooks';

export const zeewWelcome = async ( member, token ) => {
	const wlc = new Zeew.Bienvenida();

	wlc.token( token );
	wlc.estilo( 'classic' );
	wlc.avatar( member.user.displayAvatarURL( { format: 'png' } ) );
	wlc.fondo( 'https://i.imgur.com/LN6Tsu8.png' );
	wlc.colorTit( '#FFF' );
	wlc.titulo( `Bienvenid@ ${ member.displayName }` );
	wlc.colorDesc( '#FFF' );
	wlc.descripcion( `Al Servidor ${ member.guild.name }` );

	const img = await Zeew.WelcomeZeew( wlc ).catch( () => { console.log( '*Error en Zeew*' ); } );
	const att = new MessageAttachment( img, 'zeewapi-img.gif' );

	sendWelcome( `Bienvenid@ ${ member }` );
	sendWelcome( att );
};

export const zeewGoodbye = async ( member, token ) => {
	const wlc = new Zeew.Bienvenida();

	wlc.token( token );
	wlc.estilo( 'classic' );
	wlc.avatar( member.user.displayAvatarURL( { format: 'png' } ) );
	wlc.fondo( 'https://i.imgur.com/H80vUGI.png' );
	wlc.colorTit( '#FFF' );
	wlc.titulo( `${ member.displayName } Salió.` );
	wlc.colorDesc( '#FFF' );
	wlc.descripcion( '!Hasta Luego¡' );

	const img = await Zeew.WelcomeZeew( wlc ).catch( () => { console.log( '*Error en Zeew*' ); } );
	const att = new MessageAttachment( img, 'zeewapi-img.gif' );

	sendWelcome( att );
};
