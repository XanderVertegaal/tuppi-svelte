import { redirect } from '@sveltejs/kit';
import type { BeforeLoadEvent } from './$houdini';

export const _houdini_beforeLoad = ({ params }: BeforeLoadEvent) => {
	const charId = parseInt(params.characterId);

	if (charId < 1) {
		throw redirect(302, '/characters/1');
	}

	if (charId > 8) {
		throw redirect(302, '/characters/8');
	}
};
