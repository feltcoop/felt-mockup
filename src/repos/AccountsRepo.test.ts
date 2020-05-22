import {test, t} from '@feltcoop/gro';

import {AccountsRepo} from './AccountsRepo.js';
import {getKnex} from '../test.task.js';

test('AccountsRepo', async () => {
	const accounts = new AccountsRepo(getKnex());
	const allAccounts = await accounts.getAll();
	t.ok(allAccounts.length > 0);
	t.ok(allAccounts[0].id);
	t.ok(allAccounts[0].email);
});
