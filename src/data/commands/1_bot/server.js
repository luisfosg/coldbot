export default {
	name: 'serverinfo',
	alias: ['server'],
	category: 'general',
	usage: ( langs ) => langs.help.usage,
	description: ( langs ) => langs.help.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: false,
		enable: false,
		visible: false,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
	},
};
