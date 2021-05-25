export default {
	name: 'status',
	alias: ['st'],
	category: 'bot',
	usage: ( langs, p, s ) => langs.status.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.status.description,
	req: {
		minArgs: 4,
		cooldown: 20,
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
