import { getExercisesStore } from '$houdini';
import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const gameSettings = get(gameSettingsStore);

	if (!gameSettings) {
    throw redirect(302, '/characters');
	}

	const exerciseStore = new getExercisesStore();

	const exerciseQueryResults = await exerciseStore.fetch({
		variables: {
			input: gameSettings
		},
		policy: 'CacheAndNetwork'
	});

	const exercises = exerciseQueryResults?.data?.exercises || [];

	return { exercises };
}
