import {test, t} from '@feltcoop/gro';

import {AccountsRepo} from './AccountsRepo.js';
import {getKnex} from '../test.task.js';

test('AccountsRepo', async () => {
	const accountsRepo = new AccountsRepo(getKnex());
	const allAccounts = await accountsRepo.getAll();
	t.ok(allAccounts.length > 0);
	t.ok(allAccounts[0].id);
	t.ok(allAccounts[0].email);
});
