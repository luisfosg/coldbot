import { getConfig, sendEmbed } from '../util';

export const checkPermissions = async ( member, permissions ) => {
	const config = await getConfig();

	const data = permissions.map( ( permit ) => {
		if ( permit === 'OWNER_PROGRAMMER-MEMBER' ) {
			const isDev = config.devs.map( ( dev ) => {
				if ( dev[1] === member.id ) {
					return true;
				}
				return false;
			} );
			if ( isDev.includes( true ) ) return true;
		} else if ( member.hasPermission( permit ) ) {
			return true;
		}
		return false;
	} );

	if ( data.includes( false ) ) return false;
	return true;
};

export const isDev = async ( id ) => {
	const config = await getConfig();

	const isDev = config.devs.map( ( dev ) => {
		if ( dev[1] === id ) {
			return true;
		}
		return false;
	} );

	if ( isDev.includes( true ) ) return true;
};

export const isManageable = ( lang, msg, member, id ) => {
	if ( id === member.id ) return true;
	if ( !member.manageable ) {
		sendEmbed( {
			place: msg.channel,
			text: 'No Tengo Permitido Acceder a Este Usuario',
			deleteTime: 2
		} );
		return false;
	}

	return true;
};
