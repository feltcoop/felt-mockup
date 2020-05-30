import {KnexInstance} from '../obtainKnex.js';

export const up = async (knex: KnexInstance) => {
	await knex.schema.createTable('accounts', (t) => {
		t.increments();
		t.text('email').unique();
	});
};
