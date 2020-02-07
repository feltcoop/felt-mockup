import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

export const KEY = {};

export const provideSpace = initialValue => {
	const world = writable(initialValue);
	setContext(KEY, world);
	return world;
};
export const useSpace = () => {
	return getContext(KEY);
};
