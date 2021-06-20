import { getConfig, sendEmbed } from '../../util';

export default {
	name: 'report',
	alias: ['reportar'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.report.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.report.description,
	req: {
		minArgs: 2,
		cooldown: 60,
		dm: 'yes',
		enable: false,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const config = await getConfig();

		const guild = client.guilds.cache.get( config.serverDev[0] );
		const channel = guild.channels.cache.get( config.serverDev[1] );
	},
};
