import { getConfig, sendEmbed } from '../../util';

export default {
	name: 'suggestbot',
	alias: ['sb', 'sugerirbot'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.suggestbot.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.suggestbot.description,
	req: {
		minArgs: 1,
		cooldown: 60,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const config = await getConfig();

		const guild = client.guilds.cache.get( config.serverDev[0] );
		const channel = guild.channels.cache.get( config.serverDev[1] );
		let text;
		if ( msg.guild ) {
			text = `**Server:**\`\`\`\nName: ${msg.guild.name}\nID: ${msg.guild.id}\`\`\`**Content:**\`\`\`${args.join( '' )}\`\`\``;
		} else {
			text = `**Server:**\`\`\`\nMensaje Enviado Por DM\`\`\`**Content:**\`\`\`${args.join( '' )}\`\`\``;
		}
		sendEmbed( {
			place: channel,
			text,
			author: [msg.author.username, msg.author.avatarURL()],
			footer: [msg.author.id],
			timestamp: true
		} );
	},
};
