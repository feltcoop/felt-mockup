import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

export const KEY = {};

export const provideWorld = initialValue => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};

export const useWorld = () => {
	return getContext(KEY);
};
