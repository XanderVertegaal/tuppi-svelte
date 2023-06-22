import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import type { Exercise } from '$lib/types';

export const load = async function ({ fetch }) {
	const gameSettings = get(gameSettingsStore);

	if (!gameSettings) {
		throw redirect(302, '/characters');
	}

	const response = await fetch('/api/game/get-exercises', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(gameSettings)
	});

	if (!response.ok) {
		throw new Error(`Error fetching exercises: ${response.statusText}`);
	}

	const exercises = (await response.json()) as Exercise[];

	return { exercises };
} satisfies PageLoad;
