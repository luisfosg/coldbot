export const checkArgs = async ( argsDefault, args ) => {
	if ( args >= argsDefault ) return true;
	return false;
};

export const divideArgs = async ( client, string, prefix ) => {
	let args;

	string = string.slice( prefix.length );

	if ( client.splitStrings.status ) {
		args = string.split( client.splitStrings.value );
		args = args.map( ( arg ) => arg.trim() );
	} else {
		args = string.trim().split( / +/ );
	}

	return args;
};
