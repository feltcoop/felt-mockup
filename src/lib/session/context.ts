import {setContext, getContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

import type {SessionData} from '$lib/data';

export const KEY = {};

export const provideSession = (initialValue: SessionData): Writable<SessionData> => {
	const store = writable(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSession = (): Writable<SessionData> => getContext(KEY);
