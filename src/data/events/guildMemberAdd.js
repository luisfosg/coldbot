import { sendWelcome } from '../web/welcomehook';

export default async ( _client, member ) => {
	const message = `Welcome ${ member } to the server!`;
	sendWelcome( message );
};
