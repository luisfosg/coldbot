export const prefix = '> ';
export const splitStrings = [true, '<>']; // true para activar, false para desactivar
export const devs = ['LuisFOsG#2586'];

export const splDes = () => {
	if ( splitStrings[0] ) return splitStrings[1];
	return '';
};
