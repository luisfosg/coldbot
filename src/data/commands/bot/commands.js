import { MessageEmbed } from 'discord.js';

import { sendMsg, color } from '../../util';

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
		embed.addField(
			`🔹 ${ nameCategory } [${commands.size}]:`, commands.map( ( cmd ) => `\`${ cmd.name }\`` ).join( ' | ' )
		);
	}
};

const commandMessage = async ( client, msg ) => {
	const embed = new MessageEmbed();

	embed.setColor( color() );
	embed.setThumbnail( client.user.avatarURL() );
	embed.setAuthor( lang.commands.title, msg.author.avatarURL() );
	embed.setTimestamp( Date.now() );

	embed.setDescription( lang.commands.commandsNum.replace( '{{ num }}', client.commands.size ) );
	embed.setFooter( lang.commands.footer );

	client.categories.forEach( ( category ) => {
		printCategory( client, msg, embed, category );
	} );

	sendMsg( msg, embed );
};

export default {
	name: 'commands',
	alias: ['cmd', 'cmds'],
	category: 'bot',
	usage: ( langs ) => langs.commands.usage,
	description: ( langs ) => langs.commands.description,
	req: {
		minArgs: 0,
		cooldown: 0,
		dm: true,
		enable: true,
		visible: true,
		permissions: [],
	},
	run: async ( client, msg, _args ) => {
		lang = language( client, msg.guild );

		await commandMessage( client, msg );
		msg.delete().catch( () => {} );
	},
};
