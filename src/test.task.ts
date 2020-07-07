import {Task} from '@feltcoop/gro';
import {Unobtain} from '@feltcoop/gro/dist/utils/createObtainable.js';

import {obtainKnex, KnexInstance} from './db/obtainKnex.js';

// Tests can call `getKnex` to lazy-load the Knex database connection and not worry about teardown.
let knex: KnexInstance | undefined;
let unobtainKnex: Unobtain | undefined;
export const getKnex = () => {
	if (knex) return knex;
	[knex, unobtainKnex] = obtainKnex();
	return knex;
};

export const task: Task = {
	description: 'run tests',
	run: async ({invokeTask}) => {
		await invokeTask('gro/test');

		// Tests may open a database connection, so we tear it down here if so.
		if (unobtainKnex) unobtainKnex();
	},
};
