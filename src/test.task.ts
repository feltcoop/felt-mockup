import {Task} from '@feltcoop/gro';
import {task as testTask} from '@feltcoop/gro/dist/test.task.js';
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
	run: async (ctx) => {
		const {log} = ctx;

		log.info('testing');
		await testTask.run(ctx);

		if (unobtainKnex) unobtainKnex();
	},
};
