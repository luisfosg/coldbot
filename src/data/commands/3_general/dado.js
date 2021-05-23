export default {
	name: 'dice',
	alias: ['dado'],
	category: 'general',
	usage: ( langs ) => langs.help.usage,
	description: ( langs ) => langs.help.description,
	req: {
		minArgs: 0,
		cooldown: 5,
		dm: true,
		enable: false,
		visible: false,
		permissions: [],
	},
	run: async ( client, msg, args ) => {
	},
};
