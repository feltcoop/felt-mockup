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

	await knex.schema.createTable('personas', (t) => {
		t.increments();
		t.integer('account').unsigned().notNullable();
		t.foreign('account').references('id').inTable('accounts');
		// TODO does this need an index for searching duplicate names within each community?
		// or can we encode this constraint in the database somehow?
		// I tried to do `t.primary(['account', 'name'])` but got this error:
		// 		alter table "personas" add constraint "personas_pkey" primary key ("account", "name") - multiple primary keys for table "personas" are not allowed
		t.text('name').notNullable();
		// TODO see ActivityStreams icon spec - https://www.w3.org/TR/activitystreams-vocabulary/#dfn-icon
		// Should we go with that spec and make it a JSON object? Or keep it simple as a url? A foreign key?
		// t.text('icon').notNullable();
	});
};
