import {setContext, getContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

import type {SpaceData} from '$lib/data';

export const KEY = {};

export const provideSpace = (initialValue: SpaceData): Writable<SpaceData> => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};
export const useSpace = (): Writable<SpaceData> => getContext(KEY);
