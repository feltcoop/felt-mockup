import {KnexInstance} from '../db/obtainKnex.js';

export abstract class Repo<T> {
	public abstract readonly name: string;

	constructor(protected readonly knex: KnexInstance) {}

	query() {
		return this.knex<T>(this.name);
	}
}
