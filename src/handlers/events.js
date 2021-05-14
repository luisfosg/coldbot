/* eslint-disable no-continue */
import { readdirSync } from 'fs';
import { join } from 'path';

export const importEvents = async ( client ) => {
	for ( const eventFile of readdirSync( join( __dirname, '../data/events' ) ) ) {
		const contentsFile = await import( `../data/events/${ eventFile }` );

		if ( !contentsFile.default.req.enable ) continue;

		const { once } = contentsFile.default.req;
		client[once ? 'once' : 'on']( contentsFile.default.name, contentsFile.default.run.bind( null, client ) );

		delete require.cache[require.resolve( `../data/events/${eventFile}` )];
	}
};
