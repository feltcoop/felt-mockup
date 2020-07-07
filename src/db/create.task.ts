import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex} from './obtainKnex.js';

export const task: Task = {
	description: 'create the database from scratch and reset all data',
	run: async ({invokeTask}) => {
		// the sub-tasks all use knex and we don't want it to be torn down each time
		const [, unobtainKnex] = obtainKnex();
		await invokeTask('db/destroy');
		await invokeTask('db/migrate');
		await invokeTask('db/seed');
		unobtainKnex();
	},
};
