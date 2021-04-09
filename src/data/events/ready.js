/* eslint-disable no-console */
import { getConfig } from '../util';

export default async ( client ) => {
	const config = await getConfig();
	console.log( `Bot listo como: ${ client.user.tag }!` );
	client.user.setActivity( config.statusBot );
	client.user.setPresence( {
		status: 'online',
		game: {
			name: 'Cold Bot Start'
		}
	} );
};
