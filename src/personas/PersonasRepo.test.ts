import {test, t} from '@feltcoop/gro';

import {PersonasRepo} from './PersonasRepo.js';
import {getKnex} from '../test.task.js';
import {PersonaModel} from './PersonaModel.js';

const randomName = () => `persona_name_${Math.random()}`; // TODO clear the db each run?;

test('PersonasRepo', () => {
	const testAccount1 = 1; // TODO improve this? pretty hacky but fine for now. global setup to get some test accounts?
	const testAccount2 = 2;
	const personasRepo = new PersonasRepo(getKnex());
	const testName1a = randomName();
	const testName1b = randomName();
	const testName2a = randomName();
	const testName2b = randomName();
	const testName1aUppercase = testName1a.toUpperCase();
	t.isNot(testName1a, testName1aUppercase); // just in case something changes
	let testPersona1a: PersonaModel;

	test('create()', async () => {
		test('creates a persona with a case-insensitive name', async () => {
			const result = await personasRepo.create({account: testAccount1, name: testName1aUppercase});
			t.ok(result.ok);
			t.is(result.value.name, testName1a);
			testPersona1a = result.value;
		});
		test('creates a second persona for the same account', async () => {
			const result = await personasRepo.create({account: testAccount1, name: testName1b});
			t.ok(result.ok);
			t.is(result.value.name, testName1b);
		});
		test('creates a persona for a second account', async () => {
			const result = await personasRepo.create({account: testAccount2, name: testName2a});
			t.ok(result.ok);
			t.is(result.value.name, testName2a);
		});
		test('creates a second persona for the second account', async () => {
			const result = await personasRepo.create({account: testAccount2, name: testName2b});
			t.ok(result.ok);
			t.is(result.value.name, testName2b);
		});
		test('fails to create a persona with a duplicate name', async () => {
			const result = await personasRepo.create({account: testAccount1, name: testName1a});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a persona with a duplicate name with different case', async () => {
			const result = await personasRepo.create({account: testAccount1, name: testName1aUppercase});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a persona with an invalid name', async () => {
			const result = await personasRepo.create({account: testAccount1, name: ''});
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
		test('errors with an invalid account', async () => {
			await t.rejects(personasRepo.create({account: -1, name: randomName()}));
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await personasRepo.findById(testPersona1a.id);
			t.ok(result.ok);
			t.equal(result.value, testPersona1a);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personasRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noPersonaFound');
		});
	});

	test('findByAccountAndName()', async () => {
		test('finds one by account and name', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount1, testName1a);
			t.ok(result.ok);
			t.equal(result.value, testPersona1a);
		});
		test('finds one by account and name with a different case', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount1, testName1aUppercase);
			t.ok(result.ok);
			t.equal(result.value, testPersona1a);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount1, randomName());
			t.ok(!result.ok);
			t.is(result.type, 'noPersonaFound');
		});
		test('fails with an invalid name', async () => {
			const result = await personasRepo.findByAccountAndName(testAccount1, '');
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});

	test('findByAccount()', async () => {
		test('finds all by account', async () => {
			const result = await personasRepo.findByAccount(testAccount1);
			t.ok(result.ok);
			t.ok(result.value.length > 1);
			for (const persona of result.value) {
				t.is(persona.account, testAccount1);
			}
			// TODO we probably want to create a new account every test run and
			// ensure exactly these 2 persona names are found and no more
			t.ok(result.value.find((p) => p.name === testName1a));
			t.ok(result.value.find((p) => p.name === testName1b));
		});
		test('finds all for the second account', async () => {
			const result = await personasRepo.findByAccount(testAccount2);
			t.ok(result.ok);
			t.ok(result.value.length > 1);
			for (const persona of result.value) {
				t.is(persona.account, testAccount2);
			}
			// TODO we probably want to create a new account every test run and
			// ensure exactly these 2 persona names are found and no more
			t.ok(result.value.find((p) => p.name === testName2a));
			t.ok(result.value.find((p) => p.name === testName2b));
		});
		test('fails to find with an invalid account', async () => {
			const result = await personasRepo.findByAccount(-1);
			t.ok(result.ok);
			t.is(result.value.length, 0);
		});
	});
});
