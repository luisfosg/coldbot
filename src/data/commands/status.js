export default {
	name: 'status',
	alias: ['st'],
	args: 2,
	description: 'Cambia el estado del Bot',
	execute: async ( client, _msg, args ) => {
		client.user.setPresence( {
			activity: {
				name: args[0],
				url: args[1],
				type: 'STREAMING'
			},
			status: 'dnd'
		} );
	},
};
