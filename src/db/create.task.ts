import {Task} from '@feltcoop/gro/dist/task/task.js';

import {task as destroyTask} from './destroy.task.js';
import {task as migrateTask} from './migrate.task.js';
import {task as seedTask} from './seed.task.js';
import {obtainKnex} from './obtainKnex.js';

export const task: Task = {
	description: 'create the database from scratch and reset all data',
	run: async ctx => {
		// the sub-tasks all use knex and we don't want it to be torn down each time
		const [, releaseKnex] = obtainKnex();
		await destroyTask.run(ctx);
		await migrateTask.run(ctx);
		await seedTask.run(ctx);
		releaseKnex();
	},
};
