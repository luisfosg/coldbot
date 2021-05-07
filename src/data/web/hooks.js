import { getLogin } from '../util';

export const sendLog = async ( msg ) => {
	const login = await getLogin();
	const hook = login.connectLogs();
	hook.send( msg );
};

export const sendWelcome = async ( msg ) => {
	const login = await getLogin();
	const hook = login.connectWelcome();
	hook.send( msg );
};
