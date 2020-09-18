import {test, t} from '@feltcoop/gro';

import {PersonaCommunityRolesRepo} from './PersonaCommunityRolesRepo.js';
import {CommunityRolesRepo} from '../communities/CommunityRolesRepo.js';
import {getKnex} from '../test.task.js';
import {PersonaCommunityRoleModel} from './PersonaCommunityRoleModel.js';

test('PersonaCommunityRolesRepo', async () => {
	const testPersona = 1;
	// TODO improve all of this setup code
	const testCommunityRolesRepo = new CommunityRolesRepo(getKnex());
	const testCommunityRoleResult = await testCommunityRolesRepo.create({
		community: 1,
		name: `community_role_name_${Math.random()}`,
	});
	if (!testCommunityRoleResult.ok) throw Error();
	const testCommunityRole = testCommunityRoleResult.value.id;
	const personaCommunityRolesRepo = new PersonaCommunityRolesRepo(getKnex());
	let testPersonaCommunityRole: PersonaCommunityRoleModel;

	test('create()', async () => {
		test('creates a personaCommunityRole', async () => {
			const result = await personaCommunityRolesRepo.create({
				persona: testPersona,
				communityRole: testCommunityRole,
			});
			t.ok(result.ok);
			t.is(result.value.persona, testPersona);
			t.is(result.value.communityRole, testCommunityRole);
			testPersonaCommunityRole = result.value;
		});

		// TODO test duplicate

		test('errors with an invalid persona', async () => {
			await t.rejects(
				personaCommunityRolesRepo.create({persona: -1, communityRole: testCommunityRole}),
			);
		});
		test('errors with an invalid communityRole', async () => {
			await t.rejects(personaCommunityRolesRepo.create({persona: testPersona, communityRole: -1}));
		});
	});

	test('findById()', async () => {
		test('finds one by id', async () => {
			const result = await personaCommunityRolesRepo.findById(testPersonaCommunityRole.id);
			t.ok(result.ok);
			t.equal(result.value, testPersonaCommunityRole);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personaCommunityRolesRepo.findById(-1);
			t.ok(!result.ok);
			t.is(result.type, 'noPersonaCommunityRoleFound');
		});
	});

	test('findByPersonaAndCommunityRole()', async () => {
		test('finds one by persona and communityRole', async () => {
			const result = await personaCommunityRolesRepo.findByPersonaAndCommunityRole(
				testPersona,
				testCommunityRole,
			);
			t.ok(result.ok);
			t.equal(result.value, testPersonaCommunityRole);
		});
		test('fails to find a nonexistent persona', async () => {
			const result = await personaCommunityRolesRepo.findByPersonaAndCommunityRole(
				-1,
				testCommunityRole,
			);
			t.ok(!result.ok);
		});
		test('fails with an invalid name', async () => {
			const result = await personaCommunityRolesRepo.findByPersonaAndCommunityRole(testPersona, -1);
			t.ok(!result.ok);
		});
	});

	// TODO need other helper find methods to query data for personas/communities
});
