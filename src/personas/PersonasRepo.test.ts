import {test, t} from '@feltcoop/gro';

import {PersonasRepo} from './PersonasRepo.js';
import {getKnex} from '../test.task.js';
import {PersonaModel} from './PersonaModel.js';

const randomName = () => `persona_name_${Math.random()}`; // TODO clear the db each run?;

test('PersonasRepo', () => {
	const testAccount = 1; // TODO improve this? pretty hacky but fine for now. global setup to get some test accounts?
	const testAccount2 = 2;
	const personasRepo = new PersonasRepo(getKnex());
	const testName = randomName();
	const testNameUppercase = testName.toUpperCase();
	t.isNot(testName, testNameUppercase); // just in case something changes
	let testPersona: PersonaModel;

	test('create()', async () => {
		test('creates a persona with a case-insensitive name', async () => {
			const result = await personasRepo.create({account: testAccount, name: testNameUppercase});
			t.ok(result.ok);
			t.is(result.value.name, testName);
			testPersona = result.value;
		});
		test('creates a second persona for the same account', async () => {
			const name = randomName();
			const result = await personasRepo.create({account: testAccount, name});
			t.ok(result.ok);
			t.is(result.value.name, name);
		});
		test('creates a persona for a second account', async () => {
			const name = randomName();
			const result = await personasRepo.create({account: testAccount2, name});
			t.ok(result.ok);
			t.is(result.value.name, name);
		});
		test('creates a second persona for the second account', async () => {
			const name = randomName();
			const result = await personasRepo.create({account: testAccount2, name});
			t.ok(result.ok);
			t.is(result.value.name, name);
		});
		test('fails to create a persona with a duplicate name', async () => {
			const result = await personasRepo.create({account: testAccount, name: testName});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a persona with a duplicate name with different case', async () => {
			const result = await personasRepo.create({account: testAccount, name: testNameUppercase});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a persona with an invalid name', async () => {
			const result = await personasRepo.create({account: testAccount, name: ''});
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
		test('errors with an invalid account', async () => {
			await t.rejects(personasRepo.create({account: -1, name: randomName()}));
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await personasRepo.findById(testPersona.id);
			t.ok(result.ok);
			t.equal(result.value, testPersona);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personasRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noPersonaFound');
		});
	});

	test('findByAccountAndName()', async () => {
		test('finds one by account and name', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount, testName);
			t.ok(result.ok);
			t.equal(result.value, testPersona);
		});
		test('finds one by account and name with a different case', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount, testNameUppercase);
			t.ok(result.ok);
			t.equal(result.value, testPersona);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount, randomName());
			t.ok(!result.ok);
			t.is(result.type, 'noPersonaFound');
		});
		test('fails with an invalid name', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount, '');
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});

	test('findByAccount()', async () => {
		test('finds all by account', async () => {
			const result = await personasRepo.findByAccount(testAccount);
			t.ok(result.ok);
			t.ok(result.value.length > 1);
			for (const persona of result.value) {
				t.is(persona.account, testAccount);
			}
			// query the second test account's personas
			const result2 = await personasRepo.findByAccount(testAccount2);
			t.ok(result2.ok);
			t.ok(result2.value.length > 1);
			for (const persona of result2.value) {
				t.is(persona.account, testAccount2);
			}
		});
		test('fails to find with an invalid account', async () => {
			const result = await personasRepo.findByAccount(-1);
			t.ok(result.ok);
			t.is(result.value.length, 0);
		});
	});
});
