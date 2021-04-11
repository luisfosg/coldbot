import { sendWelcome } from '../web/welcomehook';

export default async ( _client, member ) => {
	const message = `${ member }, Ojala lo hayas pasado bien, y esperemos que pronto vuelva por aqui UwU.`;
	sendWelcome( message );
};
