import type { GameSettingsInput } from '$houdini';
import { writable } from 'svelte/store';

export const gameSettingsStore = writable<GameSettingsInput | null>(null);
