import {test, t} from '@feltcoop/gro';

import {CommunityRolesRepo} from './CommunityRolesRepo.js';
import {getKnex} from '../test.task.js';
import {CommunityRoleModel} from './CommunityRoleModel.js';

const randomName = () => `community_role_name_${Math.random()}`; // TODO clear the db each run?;

test('CommunityRolesRepo', () => {
	const testCommunity = 1; // TODO improve this? pretty hacky but fine for now. global setup to get some test communitys?
	const testCommunity2 = 2;
	const communityRolesRepo = new CommunityRolesRepo(getKnex());
	const testName = randomName();
	const testNameUppercase = testName.toUpperCase();
	t.isNot(testName, testNameUppercase); // just in case something changes
	let testCommunityRole: CommunityRoleModel;

	test('create()', async () => {
		test('creates a communityRole with a case-insensitive name', async () => {
			const result = await communityRolesRepo.create({
				community: testCommunity,
				name: testNameUppercase,
			});
			t.ok(result.ok);
			t.is(result.value.community, testCommunity);
			t.is(result.value.name, testName);
			testCommunityRole = result.value;
		});
		test('creates a second communityRole for the same community', async () => {
			const name = randomName();
			const result = await communityRolesRepo.create({community: testCommunity, name});
			t.ok(result.ok);
			t.is(result.value.community, testCommunity);
			t.is(result.value.name, name);
		});
		test('creates a communityRole for a second community', async () => {
			const name = randomName();
			const result = await communityRolesRepo.create({community: testCommunity2, name});
			t.ok(result.ok);
			t.is(result.value.community, testCommunity2);
			t.is(result.value.name, name);
		});
		test('creates a second communityRole for the second community', async () => {
			const name = randomName();
			const result = await communityRolesRepo.create({community: testCommunity2, name});
			t.ok(result.ok);
			t.is(result.value.community, testCommunity2);
			t.is(result.value.name, name);
		});
		test('fails to create a communityRole with a duplicate name', async () => {
			const result = await communityRolesRepo.create({community: testCommunity, name: testName});
			t.ok(!result.ok);
			t.is(result.type, 'duplicate');
		});
		test('fails to create a communityRole with a duplicate name with different case', async () => {
			const result = await communityRolesRepo.create({
				community: testCommunity,
				name: testNameUppercase,
			});
			t.ok(!result.ok);
			t.is(result.type, 'duplicate');
		});
		test('fails to create a communityRole with an invalid community', async () => {
			await t.rejects(communityRolesRepo.create({community: -1, name: randomName()}));
		});
		test('fails to create a communityRole with an empty name', async () => {
			const result = await communityRolesRepo.create({community: testCommunity, name: ''});
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
		test('fails to create a communityRole with an invalid name', async () => {
			const result = await communityRolesRepo.create({community: testCommunity, name: '1'});
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await communityRolesRepo.findById(testCommunityRole.id);
			t.ok(result.ok);
			t.equal(result.value, testCommunityRole);
		});
		test('fails to find a nonexistent communityRole', async () => {
			const result = await communityRolesRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noCommunityRoleFound');
		});
	});

	test('findByCommunityAndName()', async () => {
		test('finds one by name', async () => {
			const result = await communityRolesRepo.findByCommunityAndName(
				testCommunity,
				testCommunityRole.name,
			);
			t.ok(result.ok);
			t.equal(result.value, testCommunityRole);
		});
		test('finds one by name with a different case', async () => {
			const result = await communityRolesRepo.findByCommunityAndName(
				testCommunity,
				testNameUppercase,
			);
			t.ok(result.ok);
			t.equal(result.value, testCommunityRole);
		});
		test('fails to find a nonexistent communityRole', async () => {
			const result = await communityRolesRepo.findByCommunityAndName(testCommunity, randomName());
			t.ok(!result.ok);
			t.is(result.type, 'noCommunityRoleFound');
		});
		test('fails with an invalid name', async () => {
			const result = await communityRolesRepo.findByCommunityAndName(testCommunity, '1');
			t.ok(!result.ok);
			t.is(result.type, 'invalidName');
		});
	});

	test('findByCommunity()', async () => {
		test('finds all by community', async () => {
			const result = await communityRolesRepo.findByCommunity(testCommunity);
			t.ok(result.ok);
			t.ok(result.value.length > 1);
			for (const communityRole of result.value) {
				t.is(communityRole.community, testCommunity);
			}
			// query the second test community's communityRoles
			const result2 = await communityRolesRepo.findByCommunity(testCommunity2);
			t.ok(result2.ok);
			t.ok(result2.value.length > 1);
			for (const communityRole of result2.value) {
				t.is(communityRole.community, testCommunity2);
			}
		});
		test('fails to find with an invalid community', async () => {
			const result = await communityRolesRepo.findByCommunity(-1);
			t.ok(result.ok);
			t.is(result.value.length, 0);
		});
		test('fails with a null community', async () => {
			const result = await communityRolesRepo.findByCommunity(null as any);
			t.ok(result.ok);
			t.is(result.value.length, 0);
		});
		test('errors without an community', async () => {
			await t.rejects(communityRolesRepo.findByCommunity(undefined as any));
		});
	});
});
