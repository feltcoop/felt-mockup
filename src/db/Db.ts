import {Unobtain} from '@feltcoop/gro/dist/utils/createObtainable';

import {obtainKnex, KnexInstance} from './obtainKnex.js';
import {AccountsRepo} from '../accounts/AccountsRepo.js';
import {LoginsRepo} from '../accounts/LoginsRepo.js';
import {PersonasRepo} from '../personas/PersonasRepo.js';
import {CommunitiesRepo} from '../communities/CommunitiesRepo.js';
import {CommunityRolesRepo} from '../communities/CommunityRolesRepo.js';
import {PersonaCommunityRolesRepo} from '../personas/PersonaCommunityRolesRepo.js';

/*

The `Db` class creates and manages the server's database connection.
It instantiates `Repo`s as the application's main interface to the database,
and also makes the `knex` connection directly available for raw queries when needed.

*/
// BIKESHED `Db` or `Database` or ...?
export class Db {
	readonly knex: KnexInstance;
	readonly unobtainKnex: Unobtain;

	// BIKESHED should these be directly on the db instance as `accountRepo` etc?
	// It might be useful to straightforwardly enumerate them but that's a hypothetical.
	readonly repos: DbRepos;

	constructor() {
		const [knex, unobtainKnex] = obtainKnex();
		this.knex = knex;
		this.unobtainKnex = unobtainKnex;
		this.repos = {
			accounts: new AccountsRepo(knex),
			logins: new LoginsRepo(knex),
			personas: new PersonasRepo(knex),
			communities: new CommunitiesRepo(knex),
			communityRoles: new CommunityRolesRepo(knex),
			personaCommunityRoles: new PersonaCommunityRolesRepo(knex),
		};
	}

	async destroy(): Promise<void> {
		await this.unobtainKnex();
	}
}

interface DbRepos {
	readonly accounts: AccountsRepo;
	readonly logins: LoginsRepo;
	readonly personas: PersonasRepo;
	readonly communities: CommunitiesRepo;
	readonly communityRoles: CommunityRolesRepo;
	readonly personaCommunityRoles: PersonaCommunityRolesRepo;
}
