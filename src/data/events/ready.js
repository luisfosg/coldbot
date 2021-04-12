/* eslint-disable no-console */
export default async ( client ) => {
	console.log( `\n Bot listo como: ${ client.user.tag }! \n` );
	console.log( `Numero de Servidores: ${client.guilds.cache.size} ` );
	console.log( `Numero de Usuarios: ${client.users.cache.size} \n` );

	client.user.setPresence( {
		activity: {
			name: `Cold Bot esta en ${client.guilds.cache.size} servidores. Vamo a por mas.`,
			url: 'https://www.youtube.com/watch?v=XlgqZeeoOtI',
			type: 'STREAMING'
		},
		status: 'dnd'
	} );
};
