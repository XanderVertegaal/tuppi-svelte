import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GameResult } from '$lib/types';
import { interpretGameResults } from '$lib/interpretGameResults';

export const POST = (async ({ request }) => {
	const requestBody = await request.json();
	console.log('Request body:', requestBody);

	const gameResults = requestBody ?? ([] as GameResult[]);

	// TODO: get userId from session
	const userId = 1;

	const updatedSignProgresses = await interpretGameResults(gameResults, userId);

	return json(updatedSignProgresses);
}) satisfies RequestHandler;
