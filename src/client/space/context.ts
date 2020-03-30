import { setContext, getContext } from 'svelte';
import { writable, Writable } from 'svelte/store';

import { SpaceData } from '../../routes/_data.js';

export const KEY = {};

export const provideSpace = (initialValue: SpaceData): Writable<SpaceData> => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};
export const useSpace = (): Writable<SpaceData> => getContext(KEY);
