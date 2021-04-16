import { getConfig } from '../util';

export const checkArgs = async ( argsDefault, args ) => {
	if ( args >= argsDefault ) return true;
	return false;
};

export const divideArgs = async ( string, prefix ) => {
	const config = await getConfig();
	let args;

	string = string.slice( prefix.length );

	if ( config.splitStrings[0] ) {
		args = string.split( config.splitStrings[1] );
		args = args.map( ( arg ) => arg.trim() );
	} else {
		args = string.trim().split( / +/ );
	}

	return args;
};
