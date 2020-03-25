import { writable } from 'svelte/store';

import { Entity } from '../../routes/_data.js';

export type SelectionStoreState = null | Entity | Entity[];

export const createSelectionStore = (initialValue: SelectionStoreState) => {
	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		set,
		update,
		test: ({ id }: Entity, $selection: SelectionStoreState) => {
			if ($selection === null) return false;
			if (Array.isArray($selection)) {
				return Boolean($selection.find(s => s.id === id));
			} else {
				return $selection.id === id;
			}
		},
		select: (ent: SelectionStoreState) => {
			set(ent);
		},
		add: (ents: SelectionStoreState) => {
			update($value => {
				return [
					...(Array.isArray($value) ? $value : $value ? [$value] : []),
					...(Array.isArray(ents) ? ents : ents ? [ents] : []),
				];
			});
		},
	};
};
