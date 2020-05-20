import {setContext, getContext} from 'svelte';
import {writable, Writable} from 'svelte/store';

import {WorldData} from '../../routes/_data.js';

export const KEY = {};

export const provideWorld = (initialValue: WorldData): Writable<WorldData> => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};

export const useWorld = (): Writable<WorldData> => getContext(KEY);
