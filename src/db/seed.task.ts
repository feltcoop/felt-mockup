import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex, KnexInstance} from './obtainKnex.js';

export const task: Task = {
	description: 'seed the database',
	run: async () => {
		const [knex, unobtainKnex] = obtainKnex();

		await addSeedData(knex);

		unobtainKnex();
	},
};

// TODO should seeding use the repos or directly insert documents?
const addSeedData = async (knex: KnexInstance): Promise<void> => {
	const accounts = await knex('accounts')
		.insert([
			{email: 'a@a.a'},
			{email: 'b@b.b'},
			{email: 'c@c.c'},
			{email: 'd@d.d'},
			{email: 'e@e.e'},
		])
		.returning('*');

	await Promise.all(
		accounts.map(async (account) => {
			await knex('personas').insert([
				{name: `p${account.id}a`, account: account.id},
				{name: `p${account.id}b`, account: account.id},
				{name: `p${account.id}c`, account: account.id},
			]);
		}),
	);
};
