import { FontSet } from '$houdini';
import type { DeepMutable, SignComponents } from './types';
export function renderUnicode(unicodeString: string): string {
	return String.fromCodePoint(parseInt(unicodeString, 16));
}

export const getTypedKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export function componentsMatch(base: SignComponents | null, other: SignComponents): boolean {
	if (base === null) {
		return false;
	}
	return getTypedKeys(base).every((key) => base[key] === other[key]);
}

export const fontsetMapping: { [key in keyof typeof FontSet]: string } = {
	[FontSet.ULLIKUMMI_A]: 'cuneiform-a',
	[FontSet.ULLIKUMMI_B]: 'cuneiform-b',
	[FontSet.ULLIKUMMI_C]: 'cuneiform-c'
};
