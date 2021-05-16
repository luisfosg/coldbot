export default {
	name: 'status',
	alias: ['st'],
	category: 'bot',
	usage: ( langs ) => langs.status.usage,
	description: ( langs ) => langs.status.description,
	req: {
		args: 4,
		cooldown: 0,
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
