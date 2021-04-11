/* eslint-disable no-console */
export default async ( client ) => {
	console.log( `\n Bot listo como: ${ client.user.tag }! \n` );
	console.log( `Numero de Servidores: ${client.guilds.cache.size} ` );
	console.log( `Numero de Usuarios: ${client.users.cache.size} \n` );

	client.user.setPresence( {
		activity: {
			name: `Estoy en ${client.guilds.cache.size} servidores, genial no?`,
			type: 'WATCHING'
		},
		status: 'online'
	} );
};
