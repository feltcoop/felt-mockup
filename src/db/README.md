# Database management

Felt has a number of [Gro](https://github.com/feltcoop/gro) tasks for managing the database.
To view all of them, run `gro db`.

## Create the database

`gro db/create` creates the database from scratch.
It destroys any existing schema, runs all migrations, and seeds the database.

These tasks can be run individually as well:

- `gro db/destroy`
- `gro db/migrate`
- `gro db/seed`

## Create a migration

To create a new migration, run the migration task with a descriptive name:

`gro db/migration <name>`

This creates an empty migration file in [`src/db/migrations/`](./migrations).
When you're ready to update the database with the migration's changes,
run `gro db/migrate`.
For examples see the existing migrations,
and to learn more see [the Knex documentation](https://knexjs.org).
