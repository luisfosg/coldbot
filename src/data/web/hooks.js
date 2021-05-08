import { getLogin } from '../util';

export const sendLog = async ( msg ) => {
	const login = await getLogin();
	const hook = login.connectLogs();

	if ( hook === 'notWorking' ) return;
	hook.send( msg );
};

export const sendWelcome = async ( msg ) => {
	const login = await getLogin();
	const hook = login.connectWelcome();

	if ( hook === 'notWorking' ) return;
	hook.send( msg );
};
