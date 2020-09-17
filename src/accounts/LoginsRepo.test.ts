import {test, t} from '@feltcoop/gro';

import {LoginsRepo} from './LoginsRepo.js';
import {getKnex} from '../test.task.js';
import {LoginModel} from './LoginModel.js';

test('LoginsRepo', () => {
	const loginsRepo = new LoginsRepo(getKnex());
	const testAccountId = 1;
	const testRedirectPath = '/redirect';
	let testLogin: LoginModel;
	let testLoginUnhashedSecret: string;

	test('create()', async () => {
		test('creates a login with a redirect path', async () => {
			const result = await loginsRepo.create(testAccountId, testRedirectPath);
			t.ok(result.ok);
			t.ok(result.value.id);
			t.ok(result.value.createdAt);
			t.ok(result.value.expiresAt);
			t.ok(result.value.expiresAt.valueOf() - result.value.createdAt.valueOf() > 1000 * 60);
			t.ok(result.value.secret);
			t.is(result.value.account, testAccountId);
			t.is(result.value.redirectPath, testRedirectPath);
			testLogin = result.value;
			testLoginUnhashedSecret = result.unhashedSecret;
		});
		test('creates a login without a redirect path', async () => {
			const result = await loginsRepo.create(testAccountId);
			t.ok(result.ok);
			t.is(result.value.redirectPath, null);
		});
		test('errors with an invalid account id', async () => {
			await t.rejects(loginsRepo.create(-1));
		});
		test('errors with a null account id', async () => {
			// bypass the type system as a security check
			await t.rejects(loginsRepo.create(null as any));
		});
		test('errors with an undefined account id', async () => {
			// bypass the type system as a security check
			await t.rejects(loginsRepo.create(undefined as any));
		});
	});

	test('findBySecret()', async () => {
		test('finds one by secret', async () => {
			const result = await loginsRepo.findBySecret(testLoginUnhashedSecret);
			t.ok(result.ok);
			t.equal(result.value, testLogin);
		});
		test('fails to find with a hashed secret', async () => {
			const result = await loginsRepo.findBySecret(testLogin.secret);
			t.ok(!result.ok);
			t.is(result.type, 'noLoginFound');
		});
		test('fails to find a nonexistent login', async () => {
			const result = await loginsRepo.findBySecret('fakesecret');
			t.ok(!result.ok);
			t.is(result.type, 'noLoginFound');
		});
		test('errors with a null id', async () => {
			// bypass the type system as a security check
			await t.rejects(loginsRepo.findBySecret(null as any));
		});
		test('errors with an undefined id', async () => {
			// bypass the type system as a security check
			await t.rejects(loginsRepo.findBySecret(undefined as any));
		});
	});

	test('deleteById()', async () => {
		test('deletes one by id', async () => {
			const findResultBefore = await loginsRepo.findBySecret(testLoginUnhashedSecret);
			t.ok(findResultBefore.ok);
			const result = await loginsRepo.deleteById(findResultBefore.value.id);
			t.ok(result.ok);
			const findResultAfter = await loginsRepo.findBySecret(testLoginUnhashedSecret);
			t.ok(!findResultAfter.ok);
			t.is(findResultAfter.type, 'noLoginFound');
		});
		test('fails with an invalid id', async () => {
			const result = await loginsRepo.deleteById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noLoginFound');
		});
		test('fails with a null id', async () => {
			// bypass the type system as a security check
			const result = await loginsRepo.deleteById(null as any);
			t.ok(!result.ok);
			t.is(result.type, 'noLoginFound');
		});
		test('errors with an undefined id', async () => {
			// bypass the type system as a security check
			await t.rejects(loginsRepo.deleteById(undefined as any));
		});
	});
});
