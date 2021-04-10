import { getLogin } from '../util';

export const sendWelcome = async ( msg ) => {
	const login = await getLogin();
	const hook = login.connectWelcome();
	hook.send( msg );
};
