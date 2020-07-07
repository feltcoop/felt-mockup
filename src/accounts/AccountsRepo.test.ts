import {test, t} from '@feltcoop/gro';

import {AccountsRepo} from './AccountsRepo.js';
import {getKnex} from '../test.task.js';
import {AccountModel} from './AccountModel.js';

test('AccountsRepo', () => {
	const accountsRepo = new AccountsRepo(getKnex());
	const testEmail = `a${Math.random()}@a.a`; // TODO clear the db each run?
	const testEmailUppercase = testEmail.toUpperCase();
	t.isNot(testEmail, testEmailUppercase); // just in case something changes
	let testAccount: AccountModel;

	test('create()', async () => {
		test('creates an account', async () => {
			// Create the account with an uppercase email and ensure that the
			// stored value is a normalized lowercase version.
			const result = await accountsRepo.create({email: testEmailUppercase});
			t.ok(result.ok);
			t.equal(result.value.email, testEmail);
			testAccount = result.value;
		});
		test('fails to create an account with a duplicate email', async () => {
			const result = await accountsRepo.create({email: testEmail});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateEmail');
			t.ok(!result.error);
		});
		test('fails to create an account with a duplicate email with different case', async () => {
			const result = await accountsRepo.create({email: testEmailUppercase});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateEmail');
			t.ok(!result.error);
		});
		test('fails to create an account with an invalid email', async () => {
			const result = await accountsRepo.create({email: 'not_an_email'});
			t.ok(!result.ok);
			t.is(result.type, 'invalidEmail');
			t.ok(!result.error);
		});
		test('errors with an undefined email', async () => {
			// bypass the type system as a security check - accounts are extra important!
			await t.rejects(accountsRepo.create({} as any));
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await accountsRepo.findById(testAccount.id);
			t.ok(result.ok);
			t.equal(result.value, testAccount);
		});
		test('fails to find a nonexistent account', async () => {
			const result = await accountsRepo.findById(0);
			t.ok(!result.ok);
			t.is(result.type, 'noAccountFound');
			t.ok(!result.error);
		});
		test('errors with an undefined id', async () => {
			// bypass the type system as a security check - accounts are extra important!
			await t.rejects(accountsRepo.findById(undefined as any));
		});
	});

	test('findByEmail()', async () => {
		test('finds one by email', async () => {
			const result = await accountsRepo.findByEmail(testAccount.email);
			t.ok(result.ok);
			t.equal(result.value, testAccount);
		});
		test('finds one by email with a different case', async () => {
			const result = await accountsRepo.findByEmail(testEmailUppercase);
			t.ok(result.ok);
			t.equal(result.value, testAccount);
		});
		test('fails to find a nonexistent account', async () => {
			const result = await accountsRepo.findByEmail(`dont_add_to_db@email.com`);
			t.ok(!result.ok);
			t.is(result.type, 'noAccountFound');
			t.ok(!result.error);
		});
		test('fails with an invalid email', async () => {
			const result = await accountsRepo.findByEmail('not_an_email');
			t.ok(!result.ok);
			t.is(result.type, 'invalidEmail');
			t.ok(!result.error);
		});
		test('errors with an undefined email', async () => {
			// bypass the type system as a security check - accounts are extra important!
			await t.rejects(accountsRepo.findByEmail(undefined as any));
		});
	});
});
