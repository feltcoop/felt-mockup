import {Repo} from '../db/Repo.js';
import {ModelId} from '../db/Model.js';
import {AccountModel} from './AccountModel.js';

export class AccountsRepo extends Repo<AccountModel> {
	name = 'accounts';

	async findById(id: ModelId): Promise<AccountModel> {
		const account = await this.query().where('id', id).first();
		if (!account) {
			// TODO do we want to return result objects instead of throwing errors?
			throw Error(`Unable to find account with id ${id}`);
		}
		return account;
	}
}
