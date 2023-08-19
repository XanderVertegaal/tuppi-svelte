import { writable } from 'svelte/store';

export const darkThemeStore = writable<boolean | undefined>(undefined);
