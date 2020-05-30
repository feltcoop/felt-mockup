import {ModelId} from '../db/Model.js';
import {Email} from '../client/email/email.js';

export interface AccountModel {
	id: ModelId<'AccountModel'>;
	email: Email;
}
