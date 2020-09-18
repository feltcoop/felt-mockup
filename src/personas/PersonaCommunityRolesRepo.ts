import {Repo} from '../db/Repo.js';
import {
	PersonaCommunityRoleModel,
	PersonaCommunityRoleModelId,
} from './PersonaCommunityRoleModel.js';
import {CommunityRoleModelId} from '../communities/CommunityRoleModel.js';
import {PersonaModelId} from './PersonaModel.js';

export class PersonaCommunityRolesRepo extends Repo<PersonaCommunityRoleModel> {
	name = 'personaCommunityRoles';

	async create(
		partialModel: Pick<PersonaCommunityRoleModel, 'persona' | 'communityRole'>,
	): Promise<
		Result<
			{value: PersonaCommunityRoleModel},
			{type: 'invalidName'; reason: string} | {type: 'duplicate'; reason: string}
		>
	> {
		const {persona, communityRole} = partialModel; // TODO does this need validation? just let the db throw?

		// TODO should it rely on the db primary key uniqueness? (test that it can)
		// How can we robustly detect that error case and return a good error result?

		// Disallow duplicates. Does not rely on database to throw a uniqueness error.
		const existingPersonaCommunityRole = await this.findByPersonaAndCommunityRole(
			persona,
			communityRole,
		);
		if (existingPersonaCommunityRole.ok) {
			return {
				ok: false,
				type: 'duplicate',
				reason: `PersonaCommunityRole already exists for persona ${persona} and communityRole ${communityRole}.`,
			};
		}

		const value = (await this.query().insert({persona, communityRole}).returning('*'))[0];
		return {ok: true, value};
	}

	async findById(
		id: PersonaCommunityRoleModelId,
	): Promise<
		Result<
			{value: PersonaCommunityRoleModel},
			{type: 'noPersonaCommunityRoleFound'; reason: string}
		>
	> {
		const value = await this.query().where('id', id).first();
		return value
			? {ok: true, value}
			: {
					ok: false,
					type: 'noPersonaCommunityRoleFound',
					reason: `Cannot find personaCommunityRole with id ${id}.`,
			  };
	}

	// TODO what other methods do we need? findByPersona? findByCommunityRole?

	async findByPersonaAndCommunityRole(
		persona: PersonaModelId,
		communityRole: CommunityRoleModelId,
	): Promise<Result<{value: PersonaCommunityRoleModel}>> {
		// TODO the `Result` isn't used here - should we change the code to return `PeronaCommunityRoleModel`?
		// or is it likely we'll want to wrap certain errors in the future with a result failure?
		const value = await this.query().where({persona, communityRole}).first();
		return value ? {ok: true, value} : {ok: false};
	}
}
