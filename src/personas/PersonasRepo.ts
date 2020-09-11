import {Repo} from '../db/Repo.js';
import {PersonaModel, PersonaModelId} from './PersonaModel.js';
import {AccountModelId} from '../accounts/AccountModel.js';

// TODO what is a name?
// is it a url-friendly slug? or the human-readable title? both?
// should communities be given control over their url slug directly, decoupled from the name/title?
// how should we handle case insensitivity in the db? what about special characters like `-` and `_`? other languages?
// see https://stackoverflow.com/questions/7005302/postgresql-how-to-make-case-insensitive-query
// Should "name" has uniform semantics (like ActivityStreams properties)
// but per-table constraints, like length?
// Should "name" be have its own flavored type? For each table or global?
const normalizeName = (name: string) => name.toLowerCase();
const isName = (str: string): boolean => {
	return typeof str === 'string' && str.length > 0;
};

export class PersonasRepo extends Repo<PersonaModel> {
	name = 'personas';

	async create(
		partialModel: Pick<PersonaModel, 'account' | 'name'>,
	): Promise<
		Result<
			{value: PersonaModel},
			{type: 'invalidName'; reason: string} | {type: 'duplicateName'; reason: string}
		>
	> {
		const {account} = partialModel; // TODO does this need validation? just let the db throw?

		// TODO formalized normalization + validation
		const name = normalizeName(partialModel.name); // TODO see name discussion above
		if (!isName(name)) {
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}

		// Disallow duplicates with the same name for each account.
		// Does not rely on database to throw a uniqueness error.
		// Can we add this constraint to the database?
		const existingPersona = await this.findByAccountAndName(account, name);
		if (existingPersona.ok) {
			return {
				ok: false,
				type: 'duplicateName',
				reason: `Persona already exists with name '${name}'.`,
			};
		}

		const value = (await this.query().insert({name, account}).returning('*'))[0];
		return {ok: true, value};
	}

	async findById(
		id: PersonaModelId,
	): Promise<Result<{value: PersonaModel}, {type: 'noPersonaFound'; reason: string}>> {
		const value = await this.query().where('id', id).first();
		return value
			? {ok: true, value}
			: {ok: false, type: 'noPersonaFound', reason: `Cannot find persona with id ${id}.`};
	}

	// Finds a persona for an account by name.
	async findByAccountAndName(
		account: AccountModelId,
		name: string,
	): Promise<
		Result<
			{value: PersonaModel},
			{type: 'invalidName'; reason: string} | {type: 'noPersonaFound'; reason: string}
		>
	> {
		name = normalizeName(name); // TODO see name discussion above
		if (!isName(name)) {
			// TODO formalize validation
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}
		const value = await this.query().where({account, name}).first();
		return value
			? {ok: true, value}
			: {
					ok: false,
					type: 'noPersonaFound',
					reason: `Cannot find persona with name '${name}'.`,
			  };
	}

	// Finds all personas for an account.
	async findByAccount(account: AccountModelId): Promise<Result<{value: PersonaModel[]}>> {
		// TODO the `Result` isn't used here - should we change the code to return `PeronaModel[]`?
		// or is it likely we'll want to wrap certain errors in the future with a result failure?
		const value = await this.query().where('account', account);
		return value ? {ok: true, value} : {ok: false};
	}
}
