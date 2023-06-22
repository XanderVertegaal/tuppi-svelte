import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GameResult } from '$lib/types';
import { interpretGameResults } from '$lib/interpretGameResults';

export const POST = (async ({ request, locals }) => {
	const requestBody = await request.json();
	const gameResults = (requestBody ?? []) as GameResult[];

	if (locals.user) {
		const userId = locals.user.id;
		const updatedSignProgresses = await interpretGameResults(gameResults, userId);
		console.log('Updated:', updatedSignProgresses);
		return json(updatedSignProgresses);
	}

	return new Response(null);

}) satisfies RequestHandler;
