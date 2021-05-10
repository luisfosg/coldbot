export default {
	name: 'status',
	alias: ['st'],
	category: 'bot',
	description: 'Comando de Uso exclusivo del dueño del bot',
	req: {
		args: 4,
		dm: true,
		enable: true,
		visible: false,
		permissions: ['ADMINISTRATOR'],
	},
	run: async ( client, _msg, args ) => {
		client.user.setPresence( {
			activity: {
				name: args[0],
				url: args[1],
				type: args[2]
			},
			status: args[3]
		} );
	},
};
