import {Repo, QueryResult} from '../db/Repo.js';
import {AccountModel, AccountModelId} from './AccountModel.js';
import {isEmail, normalizeEmail, Email} from '../client/email/email.js';

export class AccountsRepo extends Repo<AccountModel> {
	name = 'accounts';

	async create(
		partialModel: Pick<AccountModel, 'email'>,
	): Promise<QueryResult<AccountModel, {type: 'invalidEmail'} | {type: 'duplicateEmail'}>> {
		const email = normalizeEmail(partialModel.email);
		if (!isEmail(email)) {
			// TODO formalize validation
			return {ok: false, type: 'invalidEmail', reason: `Invalid email '${email}'.`};
		}

		// Disallow duplicates with the same email.
		// Does not rely on database to throw a uniqueness error.
		const existingAccount = await this.findByEmail(email);
		if (existingAccount.ok) {
			return {
				ok: false,
				type: 'duplicateEmail',
				reason: `Account already exists with email '${email}'.`,
			};
		}

		const value = (await this.query().insert({email}).returning('*'))[0];
		return {ok: true, value};
	}

	async findById(id: AccountModelId): Promise<QueryResult<AccountModel, {type: 'noAccountFound'}>> {
		const value = await this.query().where('id', id).first();
		return value
			? {ok: true, value}
			: {ok: false, type: 'noAccountFound', reason: `Cannot find account with id ${id}.`};
	}

	async findByEmail(
		email: Email,
	): Promise<QueryResult<AccountModel, {type: 'invalidEmail'} | {type: 'noAccountFound'}>> {
		email = normalizeEmail(email);
		if (!isEmail(email)) {
			// TODO formalize validation
			return {ok: false, type: 'invalidEmail', reason: `Invalid email '${email}'.`};
		}
		const value = await this.query().where('email', email).first();
		return value
			? {ok: true, value}
			: {ok: false, type: 'noAccountFound', reason: `Cannot find account with email '${email}'.`};
	}
}
