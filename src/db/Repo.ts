import {KnexInstance} from '../db/obtainKnex.js';

// TODO where should this live? `src/db/queries.ts`?
// In some ways it's a generic `Result` not just a `QueryResult`.
// The pattern of extending errors will likely be used many places.
export type QueryResult<TValue, TError extends {type?: string} = {}> =
	| {ok: true; value: TValue}
	| (TError & {ok: false; reason: string});

export abstract class Repo<T> {
	public abstract readonly name: string;

	constructor(protected readonly knex: KnexInstance) {}

	query() {
		return this.knex<T>(this.name);
	}
}
