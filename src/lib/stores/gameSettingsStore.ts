import type { GameSettingsInput } from '$lib/types';
import { writable } from 'svelte/store';

export const gameSettingsStore = writable<GameSettingsInput | null>(null);
