export const checkPermissions = async ( msg, permissions ) => {
	const user = msg.member;
	const data = permissions.map( ( permit ) => {
		if ( user.hasPermission( permit ) ) {
			return true;
		}
		return false;
	} );

	if ( data.includes( false ) ) return false;
	return true;
};
