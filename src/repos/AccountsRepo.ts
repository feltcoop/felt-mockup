import {Repo} from './Repo.js';

/*

Questions:

- is `src/repos` the right place for this?
	- another possible directory structure:
		- `src/models` (or `domains` or `tables` or something else?)
			- `src/models/accounts/repo.ts`
			- `src/models/accounts/doc.ts`
			- `src/models/accounts/validate.ts`
	- where does `AccountDoc` live? `/src/docs`? (ugh see bikeshed below about naming)
		here? probably not here - it'll have validations/sanitizers and other purposes
		that have nothing to do with persistence and querying.

Bikeshed:

- `AccountsRepo` or `AccountRepo`? something else?
- `doc` for "document" is overloaded with "documentation" - `src/docs` is no good!
	- `record` seems too overloaded
	- is `row` too SQL-specific?
	- `model` kinda works

*/

interface AccountDoc {
	id: number;
	email: string;
}

export class AccountsRepo extends Repo<AccountDoc> {
	name = 'accounts';

	async getAll(): Promise<AccountDoc[]> {
		return this.query().select('*');
	}
}
