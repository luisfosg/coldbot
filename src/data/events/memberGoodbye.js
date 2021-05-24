import { MessageEmbed } from 'discord.js';

import { zeewGoodbye } from '../functions/zeewImages';
import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin, color } from '../util';

import language from '../functions/language';

const goodbyeNormal = ( lang, member ) => {
	const message = lang.memberGoodbye.message.replace(
		'{{ member }}', member
	);
	sendWelcome( message );
};

export default {
	name: 'guildMemberRemove',
	req: {
		once: false,
		enable: true,
	},
	run: async ( client, member ) => {
		const lang = language( client, member.guild );

		const login = await getLogin();

		if ( member.guild.id !== login.idServer ) {
			const embed = new MessageEmbed();

			embed.setTitle( lang.memberGoodbye.title );
			embed.setColor( color() );
			embed.setDescription( lang.memberGoodbye.description.replace(
				'{{ member }}', member
			).replace(
				'{{ server }}', member.guild.name
			) );
			embed.setTimestamp();
			embed.setFooter( member.guild.name, member.guild.iconURL() );

			return sendLog( embed );
		}

		if ( login.zeewToken ) {
			zeewGoodbye( member, login.zeewToken );
		} else {
			goodbyeNormal( lang, member );
		}
	},
};
