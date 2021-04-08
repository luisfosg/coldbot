export async function getLogin() {
	const login = await import( '../private/login' );
	return login;
}
