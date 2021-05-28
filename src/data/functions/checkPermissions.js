export const checkPermissions = async ( member, permissions ) => {
	const data = permissions.map( ( permit ) => {
		if ( member.hasPermission( permit ) ) {
			return true;
		}
		return false;
	} );

	if ( data.includes( false ) ) return false;
	return true;
};
