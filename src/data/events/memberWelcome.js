import { MessageEmbed } from 'discord.js';

import { zeewWelcome } from '../functions/zeewImages';
import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin } from '../util';

import language from '../functions/language';

const welcomeNormal = ( lang, member ) => {
	const message = lang.memberWelcome.message.replace(
		'{{ member }}', member
	).replace(
		'{{ server }}', member.guild.name
	);
	sendWelcome( message );
};

export default {
	name: 'guildMemberAdd',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, member ) => {
		const lang = language( client, member.guild );

		const login = await getLogin();

		if ( member.guild.id !== login.idServer ) {
			const embed = new MessageEmbed();

			embed.setTitle( lang.memberWelcome.title );
			embed.setColor( 'RED' );
			embed.setDescription( lang.memberWelcome.description.replace(
				'{{ member }}', member
			).replace(
				'{{ server }}', member.guild.name
			) );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		if ( login.zeewToken ) {
			member.send( lang.memberWelcome.messageMd.replace(
				'{{ member }}', member
			).replace(
				'{{ server }}', member.guild.name
			) );
			zeewWelcome( member, login.zeewToken );
		} else {
			welcomeNormal( lang, member );
		}
	},
};
