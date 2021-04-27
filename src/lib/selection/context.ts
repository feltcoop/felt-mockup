import {setContext, getContext} from 'svelte';

import {createSelectionStore} from './store';
import type {SelectionStore, SelectionStoreState} from './store';

export const KEY = {};

// TODO or `send` it a state machine event?
// TODO other methods/events  like `addToSelection`

export const provideSelection = (initialValue: SelectionStoreState = null): SelectionStore => {
	const store = createSelectionStore(initialValue);
	setContext(KEY, store);
	return store;
};

export const useSelection = (): SelectionStore => getContext(KEY);
