import {setContext, getContext} from 'svelte';
import {Writable} from 'svelte/store';

import {createSelectionStore, SelectionStoreState} from './store.js';

export const KEY = {};

// TODO or `send` it a state machine event?
// TODO other methods/events  like `addToSelection`

export const provideSelection = (
	initialValue: SelectionStoreState = null,
): Writable<SelectionStoreState> => {
	const store = createSelectionStore(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSelection = (): Writable<SelectionStoreState> => getContext(KEY);
