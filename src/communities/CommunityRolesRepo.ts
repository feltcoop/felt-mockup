import {Repo} from '../db/Repo.js';
import {CommunityRoleModel, CommunityRoleModelId} from './CommunityRoleModel.js';
import {CommunityModelId} from './CommunityModel.js';

// TODO see notes in ../communities/CommunitiesRepo.ts
const normalizeName = (name: string) => name.toLowerCase();
const isName = (str: string): boolean => {
	return typeof str === 'string' && str.length > 1;
};

export class CommunityRolesRepo extends Repo<CommunityRoleModel> {
	name = 'communityRoles';

	async create(
		partialModel: Pick<CommunityRoleModel, 'community' | 'name'>,
	): Promise<
		Result<
			{value: CommunityRoleModel},
			{type: 'invalidName'; reason: string} | {type: 'duplicate'; reason: string}
		>
	> {
		const {community} = partialModel; // TODO does this need validation? just let the db throw?

		// TODO formalized normalization + validation
		const name = normalizeName(partialModel.name); // TODO see name discussion in ./CommunitiesRepo.ts
		if (!isName(name)) {
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}

		// Disallow duplicates with the same name within a community.
		// Does not rely on database to throw a uniqueness error.
		// TODO should it? see other repo `create` functions too
		const existingCommunityRole = await this.findByCommunityAndName(community, name);
		if (existingCommunityRole.ok) {
			// TODO seems there could be a hole in our logic here and in similar checks in other repos.
			// If the database query fails for reasons that don't throw an error,
			// we could falsely think that there's no communityRole with this name.
			// (currently this won't happen, but it could with future changes)
			// The database primary key should block duplicates in this case, (I think?)
			// but what about other cases? (do any repos hae this possible issue?)
			return {
				ok: false,
				type: 'duplicate',
				reason: `CommunityRole already exists with community ${community} and name '${name}'.`,
			};
		}

		const value = (await this.query().insert({name, community}).returning('*'))[0];
		return {ok: true, value};
	}

	async findById(
		id: CommunityRoleModelId,
	): Promise<Result<{value: CommunityRoleModel}, {type: 'noCommunityRoleFound'; reason: string}>> {
		const value = await this.query().where('id', id).first();
		return value
			? {ok: true, value}
			: {
					ok: false,
					type: 'noCommunityRoleFound',
					reason: `Cannot find communityRole with id ${id}.`,
			  };
	}

	// TODO do we want this method? probably?
	async findByCommunityAndName(
		community: CommunityModelId,
		name: string,
	): Promise<
		Result<
			{value: CommunityRoleModel},
			{type: 'invalidName'; reason: string} | {type: 'noCommunityRoleFound'; reason: string}
		>
	> {
		name = normalizeName(name); // TODO see name discussion in ./CommunitiesRepo.ts
		if (!isName(name)) {
			// TODO formalize validation
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}
		const value = await this.query().where({community, name}).first();
		return value
			? {ok: true, value}
			: {
					ok: false,
					type: 'noCommunityRoleFound',
					reason: `Cannot find communityRole with community ${community} and name '${name}'.`,
			  };
	}

	async findByCommunity(
		community: CommunityModelId,
	): Promise<Result<{value: CommunityRoleModel[]}>> {
		// TODO the `Result` isn't used here - should we change the code to return `CommunityRoleModel[]`?
		// or is it likely we'll want to wrap certain errors in the future with a result failure?
		const value = await this.query().where('community', community);
		return value ? {ok: true, value} : {ok: false};
	}
}
