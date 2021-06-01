import { zeewGoodbye } from '../functions/zeewImages';
import { sendLog, sendWelcome } from '../web/hooks';
import { getLogin, sendEmbed } from '../util';

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
			return sendLog( sendEmbed( {
				title: lang.memberGoodbye.title,
				text: lang.memberGoodbye.description.replace(
					'{{ member }}', member
				).replace(
					'{{ server }}', member.guild.name
				),
				timestamp: true,
				footer: [member.guild.name, member.guild.iconURL()],
				returnEmbed: true
			} ) );
		}

		if ( login.zeewToken ) {
			zeewGoodbye( member, login.zeewToken );
		} else {
			goodbyeNormal( lang, member );
		}
	},
};
