import {setContext, getContext} from 'svelte';
import {writable, Writable} from 'svelte/store';

import {SessionData} from '../../routes/_data.js';

export const KEY = {};

export const provideSession = (initialValue: SessionData): Writable<SessionData> => {
	const store = writable(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSession = (): Writable<SessionData> => getContext(KEY);
