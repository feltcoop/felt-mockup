import {test, t} from '@feltcoop/gro';

import {CommunitiesRepo} from './CommunitiesRepo.js';
import {getKnex} from '../test.task.js';
import {CommunityModel} from './CommunityModel.js';

test('CommunitiesRepo', () => {
	const communitiesRepo = new CommunitiesRepo(getKnex());
	const testName = `community_name${Math.random()}`;
	const testNameUppercase = testName.toUpperCase();
	t.isNot(testName, testNameUppercase); // just in case something changes
	let testCommunity: CommunityModel;

	test('create()', async () => {
		test('creates a community with a case-insensitive name', async () => {
			const result = await communitiesRepo.create({name: testNameUppercase});
			t.ok(result.ok);
			t.is(result.value.name, testName);
			testCommunity = result.value;
		});
		test('fails to create a community with a duplicate name', async () => {
			const result = await communitiesRepo.create({name: testName});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a community with a duplicate name with different case', async () => {
			const result = await communitiesRepo.create({name: testNameUppercase});
			t.ok(!result.ok);
			t.is(result.type, 'duplicateName');
		});
		test('fails to create a community with an empty name', async () => {
			const result = await communitiesRepo.create({name: ''});
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await communitiesRepo.findById(testCommunity.id);
			t.ok(result.ok);
			t.equal(result.value, testCommunity);
		});
		test('fails to find a nonexistent community', async () => {
			const result = await communitiesRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noCommunityFound');
		});
	});

	test('findByName()', async () => {
		test('finds one by name', async () => {
			const result = await communitiesRepo.findByName(testCommunity.name);
			t.ok(result.ok);
			t.equal(result.value, testCommunity);
		});
		test('finds one by name with a different case', async () => {
			const result = await communitiesRepo.findByName(testNameUppercase);
			t.ok(result.ok);
			t.equal(result.value, testCommunity);
		});
		test('fails to find a nonexistent community', async () => {
			const result = await communitiesRepo.findByName(`not_in_db`);
			t.ok(!result.ok);
			t.is(result.type, 'noCommunityFound');
		});
		test('fails with an invalid name', async () => {
			const result = await communitiesRepo.findByName('');
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});
});
