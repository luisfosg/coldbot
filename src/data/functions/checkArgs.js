export const checkArgs = async ( argsDefault, args ) => args >= argsDefault;

export const checkMd = ( reqMd, type ) => !( ( !reqMd ) && ( type === 'dm' ) );

export const divideArgs = async ( client, string, prefix ) => {
	let args;
	string = string.slice( prefix.length );

	const command = string.trim().split( / +/ ).shift().toLowerCase();
	string = string.trim().slice( command.length ).trim();
	if ( string === '' ) return [command, []];

	if ( client.splitStrings.status ) {
		args = string.trim().split( client.splitStrings.value );
		args = args.map( ( arg ) => arg.trim() );
	} else {
		args = string.trim().split( / +/ );
	}

	return [command, args];
};
