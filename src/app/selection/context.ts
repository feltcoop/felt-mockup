import { setContext, getContext } from 'svelte';

import { createSelectionStore, SelectionStoreState } from './store.js';

export const KEY = {};

// TODO or `send` it a state machine event?
		// TODO other methods/events  like `addToSelection`

export const provideSelection = (initialValue: SelectionStoreState = null) => {
	const store = createSelectionStore(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSelection = () => {
	return getContext(KEY);
};
