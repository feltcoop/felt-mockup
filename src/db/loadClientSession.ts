import {AccountSession} from '../client/session/session.js';
import {unwrap} from '../utils.js';
import {Db} from '../db/Db.js';
import {AccountModel} from '../accounts/AccountModel.js';

// TODO should this and `src/client/session` stuff be located in the same place?
// should that be in `src/session`?
// This is currently separated because it includes server-only imports.
// Even though Rollup allows it, I think it's inadvisable
// to mix server-only concerns into modules imported by the client.

export const loadClientSession = async (db: Db, account: AccountModel): Promise<AccountSession> => {
	return {
		account,
		personas: unwrap(await db.repos.personas.findByAccount(account.id)),
	};
};
