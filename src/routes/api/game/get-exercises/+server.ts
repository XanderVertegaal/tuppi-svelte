import { createExercises } from '$lib/formatExercises';
import type { GameSettingsInput } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST = (async ({ request }) => {
	const requestBody = await request.json();

	const gameSettingsInput: GameSettingsInput = {
		selectedIds: requestBody.selectedIds ?? [],
		numberOfAlternatives: requestBody.numberOfAlternatives ?? 5,
		inclDet: requestBody.inclDet ?? false,
		inclLog: requestBody.inclLog ?? false,
		inclSyll: requestBody.inclSyll ?? true,
		cunToTranslit: requestBody.inclSyll ?? true,
		translitToCun: requestBody.translitToCun ?? false
	};

	const exercises = await createExercises(gameSettingsInput);

	return json(exercises);
}) satisfies RequestHandler;
