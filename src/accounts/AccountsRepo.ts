import {Repo} from '../db/Repo.js';
import {AccountModel} from './AccountModel.js';

export class AccountsRepo extends Repo<AccountModel> {
	name = 'accounts';

	async getAll(): Promise<AccountModel[]> {
		return this.query().select('*');
	}
}
