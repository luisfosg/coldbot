import { sendEmbed } from '../../util';

import language from '../../functions/language';

let lang;

const printCategory = ( client, msg, embed, category ) => {
	const isdm = msg.channel.type;
	const commands = client.commands.filter( ( cmd ) => {
		if ( cmd.category === category ) {
			if ( ( isdm === 'dm' ) && !cmd.req.dm ) return false;
			if ( cmd.req.visible ) {
				return true;
			}
		}
		return false;
	} );

	const nameCategory = category.charAt( 0 ).toUpperCase() + category.slice( 1 );

	if ( commands.size > 0 ) {
		embed.push(
			[
				`🔹 ${ nameCategory } [${commands.size}]:`,
				commands.map( ( cmd ) => `\`${ cmd.name }\`` ).join( ' | ' )
			]
		);
	}
};

const commandMessage = async ( client, msg ) => {
	const fields = [];

	await client.categories.forEach( ( category ) => {
		printCategory( client, msg, fields, category );
	} );

	sendEmbed( {
		place: msg.channel,
		text: lang.commands.commandsNum.replace( '{{ num }}', client.commands.size ),
		fields,
		author: [lang.commands.title, msg.author.avatarURL()],
		thumbnail: client.user.avatarURL(),
		footer: [lang.commands.footer],
		timestamp: true,
		deleteTime: 60
	} );
};

export default {
	name: 'commands',
	alias: ['cmd', 'cmds'],
	category: 'bot',
	usage: ( langs, p, s ) => langs.commands.usage.replace( /{{ p }}/g, p ).replace( /{{ s }}/g, s ),
	description: ( langs ) => langs.commands.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
		necessary: []
	},
	run: async ( client, msg, _args ) => {
		lang = language( { guild: msg.guild } );

		await commandMessage( client, msg );
		msg.delete().catch( () => {} );
	},
};
