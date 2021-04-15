import { sendWelcome } from '../web/welcomehook';

export default {
	req: {
		once: false,
		enable: true,
	},
	run: async ( _client, member ) => {
		const message = `Bienvenido ${ member } al Servidor Git Merge!!`;
		sendWelcome( message );
	},
};
