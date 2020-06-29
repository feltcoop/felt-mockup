import {ModelId} from '../db/Model.js';
import {Email} from '../client/email/email.js';

export type AccountModelId = ModelId<'AccountModel'>;

export interface AccountModel {
	id: AccountModelId;
	email: Email;
}
