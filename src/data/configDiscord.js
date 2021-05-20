export const prefix = 'cb!';
export const splitStrings = [true, ';']; // true para activar, false para desactivar
export const devs = [['LuisFOsG#2586', '364056638895685633']];
export const language = 'es';

export const splDes = () => {
	if ( splitStrings[0] ) return splitStrings[1];
	return '';
};
