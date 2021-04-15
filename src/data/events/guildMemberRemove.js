import { sendWelcome } from '../web/welcomehook';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, member ) => {
		const message = `${ member }, Ojala lo hayas pasado bien, y esperemos que pronto vuelva por aqui UwU.`;
		sendWelcome( message );
	},
};
