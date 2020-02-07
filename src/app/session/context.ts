import { setContext, getContext } from 'svelte';
import { writable } from 'svelte/store';

export const KEY = {};

export const provideSession = <T>(initialValue:T ) => {
	const store = writable(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSession = () => {
	return getContext(KEY);
};
