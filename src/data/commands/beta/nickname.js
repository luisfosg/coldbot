import { sendEmbed, getUserWithId } from '../../util';

export default {
	name: 'nickname',
	alias: ['apodo', 'nick'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.nickname.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.nickname.description,
	req: {
		minArgs: 2,
		cooldown: 0,
		dm: 'not',
		enable: true,
		visible: true,
		permissions: ['MANAGE_NICKNAMES'],
		necessary: ['MANAGE_NICKNAMES', 'CHANGE_NICKNAME']
	},
	run: async ( client, msg, args ) => {
		const user = await getUserWithId( {
			client,
			msg,
			mention: args[0],
			member: true
		} );

		if ( !user || user === 'notFound' ) return sendEmbed( { place: msg.channel, text: 'Usuario No Encontrado', deleteTime: 2 } );
		if ( !user.manageable ) {
			return sendEmbed( {
				place: msg.channel,
				text: 'No Tengo Permitido Acceder a Este Usuario',
				deleteTime: 2
			} );
		}

		await user.setNickname( args[1] );
		sendEmbed( {
			place: msg.channel,
			text: 'Apodo Cambiado Correctamente.',
			deleteTime: 3
		} );
	},
};
