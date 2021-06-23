import { getConfig, sendEmbed } from '../../util';

export default {
	name: 'report',
	alias: ['reportar'],
	category: 'beta',
	usage: ( langs, p, s ) => langs.report.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.report.description,
	req: {
		minArgs: 2,
		cooldown: 0,
		dm: 'yes',
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, args ) => {
		const config = await getConfig();

		const guild = client.guilds.cache.get( config.reportsChannel[0] );
		const channel = guild.channels.cache.get( config.reportsChannel[1] );

		let text;

		if ( msg.guild ) {
			text = `**Server:**\`\`\`\nName: ${msg.guild.name}\nID: ${msg.guild.id}\`\`\`**Comando:**\`\`\`${args[0]}\`\`\`**Problema:**\`\`\`${args[1]}\`\`\``;
		} else {
			text = `**Server:**\`\`\`\nMensaje Enviado Por DM\`\`\`**Comando:**\`\`\`${args[0]}\`\`\`**Problema:**\`\`\`${args[1]}\`\`\``;
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
