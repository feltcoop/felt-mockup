import {Repo} from '../db/Repo.js';
import {CommunityModel, CommunityModelId} from './CommunityModel.js';

// TODO see discussion of "name" property in ../personas/PersonasRepo.ts
const normalizeName = (name: string) => name.toLowerCase();
const isName = (str: string): boolean => {
	return typeof str === 'string' && str.length > 0;
};

export class CommunitiesRepo extends Repo<CommunityModel> {
	name = 'communities';

	// TODO do we want to store the creator's account as well? or is the default admin role enough?
	async create(
		partialModel: Pick<CommunityModel, 'name'>,
	): Promise<
		Result<
			{value: CommunityModel},
			{type: 'invalidName'; reason: string} | {type: 'duplicateName'; reason: string}
		>
	> {
		// TODO formalized normalization + validation
		const name = normalizeName(partialModel.name);
		if (!isName(name)) {
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}

		// Disallow duplicates with the same name.
		// Does not rely on database to throw a uniqueness error.
		const existingCommunity = await this.findByName(name);
		if (existingCommunity.ok) {
			return {
				ok: false,
				type: 'duplicateName',
				reason: `Community already exists with name '${name}'.`,
			};
		}

		const value = (await this.query().insert({name}).returning('*'))[0];
		return {ok: true, value};
	}

	async findById(
		id: CommunityModelId,
	): Promise<Result<{value: CommunityModel}, {type: 'noCommunityFound'; reason: string}>> {
		const value = await this.query().where('id', id).first();
		return value
			? {ok: true, value}
			: {ok: false, type: 'noCommunityFound', reason: `Cannot find community with id ${id}.`};
	}

	async findByName(
		name: string,
	): Promise<
		Result<
			{value: CommunityModel},
			{type: 'invalidName'; reason: string} | {type: 'noCommunityFound'; reason: string}
		>
	> {
		name = normalizeName(name); // TODO see name discussion at top of file
		if (!isName(name)) {
			// TODO formalize validation
			return {ok: false, type: 'invalidName', reason: `Invalid name '${name}'.`};
		}
		const value = await this.query().where('name', name).first();
		return value
			? {ok: true, value}
			: {
					ok: false,
					type: 'noCommunityFound',
					reason: `Cannot find community with name '${name}'.`,
			  };
	}
}
