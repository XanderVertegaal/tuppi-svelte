import { gameSettingsStore } from '$lib/stores/gameSettingsStore';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load() {
	// const gameSettings = get(gameSettingsStore);
	const gameSettings = get(gameSettingsStore);
	console.log('Game settings:', gameSettings);

	if (!gameSettings) {
    throw redirect(302, '/characters');
	}

	// const exerciseStore = new getExercisesStore();

	// const exerciseQueryResults = await exerciseStore.fetch({
	// 	variables: {
	// 		input: gameSettings
	// 	},
	// 	policy: 'CacheAndNetwork'
	// });

	const exercises = exerciseQueryResults?.data?.exercises || [];

	return { exercises };
}
