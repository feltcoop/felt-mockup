import {KnexInstance} from '../obtainKnex.js';

export const up = async (knex: KnexInstance) => {
	await knex.schema.createTable('accounts', (t) => {
		t.increments();
		t.text('email').unique();
	});

	await knex.schema.createTable('logins', (t) => {
		t.increments();
		t.dateTime('createdAt').defaultTo(knex.fn.now());
		t.dateTime('expiresAt').notNullable();
		t.integer('account').unsigned().notNullable();
		t.foreign('account').references('id').inTable('accounts');
		t.text('secret').index().notNullable();
		t.text('redirectPath');
	});
};
