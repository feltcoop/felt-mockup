import {setContext, getContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

import type {WorldData} from '$lib/data';

export const KEY = {};

export const provideWorld = (initialValue: WorldData): Writable<WorldData> => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};

export const useWorld = (): Writable<WorldData> => getContext(KEY);
