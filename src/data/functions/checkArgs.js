export const checkArgs = async ( argsDefault, args ) => {
	if ( args >= argsDefault ) return true;
	return false;
};
