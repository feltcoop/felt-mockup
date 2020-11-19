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

	// TODO review indexes on these new tables

	await knex.schema.createTable('personas', (t) => {
		t.increments();
		t.integer('account').unsigned().notNullable();
		t.foreign('account').references('id').inTable('accounts');
		t.text('name').notNullable(); // TODO index? depends on final design
		// TODO see ActivityStreams icon spec - https://www.w3.org/TR/activitystreams-vocabulary/#dfn-icon
		// Should we go with that spec and make it a JSON object? Or keep it simple as a url? A foreign key?
		// t.text('icon').notNullable();
	});

	await knex.schema.createTable('communities', (t) => {
		t.increments();
		t.text('name').index().notNullable().unique();
		// t.text('icon').notNullable(); // see above in personas
	});

	await knex.schema.createTable('communityRoles', (t) => {
		t.increments();
		t.integer('community').unsigned().notNullable();
		t.foreign('community').references('id').inTable('communities');
		t.text('name').notNullable(); // TODO does this need an index? or does the primary key handle this?
		t.json('permissions'); // TODO?
	});

	await knex.schema.createTable('personaCommunityRoles', (t) => {
		t.increments();
		t.integer('persona').unsigned().notNullable();
		t.foreign('persona').references('id').inTable('personas');
		t.integer('communityRole').unsigned().notNullable();
		t.foreign('communityRole').references('id').inTable('communityRoles');
	});
};
