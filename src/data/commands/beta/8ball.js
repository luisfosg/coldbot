import { sendEmbed } from '../../util';

const answers = ['Si', 'No', 'Depronto'];

export default {
	name: '8ball',
	alias: [],
	category: 'beta',
	version: '0.0.1',
	usage: ( langs, p, s ) => langs.meme.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.meme.description,
	req: {
		minArgs: 1,
		cooldown: 5,
		dm: 'yes',
		enable: false,
		visible: false,
		permissions: [],
		necessary: []
	},
	run: async ( _client, msg, args ) => {
		sendEmbed( {
			place: msg.channel,
			title: args[0],
			text: answers[Math.floor( Math.random() * answers.length )],
		} );
	},
};
