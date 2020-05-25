import {test, t} from '@feltcoop/gro';

import {AccountsRepo} from './AccountsRepo.js';
import {getKnex} from '../test.task.js';

test('AccountsRepo', () => {
	const accountsRepo = new AccountsRepo(getKnex());

	test('findById()', async () => {
		test('finds an account', async () => {
			const account = await accountsRepo.findById(1);
			t.ok(account);
			t.is(account.id, 1);
			t.ok(account.email);
		});
		test('fails to find a nonexistent account', async () => {
			await t.rejects(accountsRepo.findById(0));
		});
	});
});
