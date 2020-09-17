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
		test('creates an account with a case-insensitive email address', async () => {
			const result = await accountsRepo.create({email: testEmailUppercase});
			t.ok(result.ok);
			t.is(result.value.email, testEmail);
			testAccount = result.value;
		});
		test('fails to create an account with a duplicate email', async () => {
			const result = await accountsRepo.create({email: testEmail});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateEmail');
		});
		test('fails to create an account with a duplicate email with different case', async () => {
			const result = await accountsRepo.create({email: testEmailUppercase});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateEmail');
		});
		test('fails to create an account with an invalid email', async () => {
			const result = await accountsRepo.create({email: 'not_an_email'});
			t.ok(!result.ok);
			t.is(result.type, 'invalidEmail');
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
			const result = await accountsRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noAccountFound');
		});
		test('fails to find a null account', async () => {
			// bypass the type system as a security check - accounts are extra important!
			const result = await accountsRepo.findById(null as any);
			t.ok(!result.ok);
			t.is(result.type, 'noAccountFound');
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
			const result = await accountsRepo.findByEmail(`not_in_db@email.com`);
			t.ok(!result.ok);
			t.is(result.type, 'noAccountFound');
		});
		test('fails with an invalid email', async () => {
			const result = await accountsRepo.findByEmail('not_an_email');
			t.ok(!result.ok);
			t.is(result.type, 'invalidEmail');
		});
		test('errors with a null email', async () => {
			// bypass the type system as a security check - accounts are extra important!
			await t.rejects(accountsRepo.findByEmail(null as any));
		});
		test('errors with an undefined email', async () => {
			// bypass the type system as a security check - accounts are extra important!
			await t.rejects(accountsRepo.findByEmail(undefined as any));
		});
	});
});
