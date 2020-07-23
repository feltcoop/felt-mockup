import {createHash, randomBytes} from 'crypto';

import {Repo} from '../db/Repo.js';
import {LoginModel, LoginModelId} from './LoginModel.js';
import {AccountModelId} from './AccountModel.js';

export class LoginsRepo extends Repo<LoginModel> {
	name = 'logins';

	expirationDuration = 1000 * 60 * 10; // 10 minutes

	async create(
		accountId: AccountModelId,
		redirectPath: string | null = null,
	): Promise<Result<{value: LoginModel; unhashedSecret: string}>> {
		const unhashedSecret = createUnhashedSecret();
		const secret = hashSecret(unhashedSecret);
		const value = (
			await this.query()
				.insert({
					account: accountId,
					secret,
					redirectPath,
					expiresAt: new Date(Date.now() + this.expirationDuration),
				})
				.returning('*')
		)[0];
		return {ok: true, value, unhashedSecret};
	}

	async findBySecret(
		unhashedSecret: string,
	): Promise<Result<{value: LoginModel}, {type: 'noLoginFound'; reason: string}>> {
		const secret = hashSecret(unhashedSecret);
		const value = await this.query().where('secret', secret).first();
		return value
			? {ok: true, value}
			: {ok: false, type: 'noLoginFound', reason: `Cannot find login for '${unhashedSecret}'.`};
	}

	async deleteById(id: LoginModelId): Promise<Result<{}, {type: 'noLoginFound'; reason: string}>> {
		const count = await this.query().where('id', id).delete();
		return count === 1
			? {ok: true}
			: {ok: false, type: 'noLoginFound', reason: `Failed to delete login with id '${id}'.`};
	}
}

// TODO move to shared utilities?
// The unhashed secret uses hex string encoding to avoid URL-encoding special characters,
// and the stored hash value uses base64 encoding for efficiency.
// Using utf8 can fail because Postgres does not allow the NULL character in text fields.
// There may be a more optimal datatype.
const UNHASHED_SECRET_BYTE_SIZE = 16; // 128 bit, plenty secure with sha256 and 10 minute expiry!
const createUnhashedSecret = (): string => randomBytes(UNHASHED_SECRET_BYTE_SIZE).toString('hex');
const hashSecret = (unhashedSecret: string): string =>
	createHash('sha256').update(Buffer.from(unhashedSecret, 'hex')).digest().toString('base64');
