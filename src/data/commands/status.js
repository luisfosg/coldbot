export default {
	name: 'status',
	alias: ['st'],
	description: 'Cambia el estado del Bot',
	req: {
		args: 4,
		enable: false,
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
