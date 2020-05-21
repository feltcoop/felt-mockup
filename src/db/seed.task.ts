import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex} from './obtainKnex.js';

export const task: Task = {
	description: 'seed the database',
	run: async () => {
		const [knex, unobtainKnex] = obtainKnex();

		await knex('accounts').insert([
			{email: 'test1@email.com'},
			{email: 'test2@email.com'},
			{email: 'test3@email.com'},
		]);

		unobtainKnex();
	},
};
