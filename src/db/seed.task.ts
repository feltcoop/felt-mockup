import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex} from './obtainKnex.js';

export const task: Task = {
	description: 'seed the database',
	run: async () => {
		const [knex, unobtainKnex] = obtainKnex();

		await knex('accounts').insert([
			{email: 'a@a.a'},
			{email: 'b@b.b'},
			{email: 'c@c.c'},
			{email: 'd@d.d'},
			{email: 'e@e.e'},
		]);

		unobtainKnex();
	},
};
