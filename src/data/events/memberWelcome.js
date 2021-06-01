import { zeewWelcome } from '../functions/zeewImages';
import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin, sendEmbed } from '../util';

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
			return sendLog( sendEmbed( {
				title: lang.memberWelcome.title,
				text: lang.memberWelcome.description.replace(
					'{{ member }}', member
				).replace(
					'{{ server }}', member.guild.name
				),
				timestamp: true,
				footer: [member.guild.name, member.guild.iconURL()]
			} ) );
		}

		if ( login.zeewToken ) {
			sendEmbed( {
				place: member,
				text: lang.memberWelcome.messageMd.replace(
					'{{ member }}', member
				).replace(
					'{{ server }}', member.guild.name
				)
			} );
			zeewWelcome( member, login.zeewToken );
		} else {
			welcomeNormal( lang, member );
		}
	},
};
