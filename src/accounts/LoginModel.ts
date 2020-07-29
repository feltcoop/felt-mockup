import {ModelId} from '../db/Model.js';
import {AccountModelId} from './AccountModel.js';

export type LoginModelId = ModelId<LoginModel>;

export interface LoginModel {
	id: LoginModelId;
	createdAt: Date;
	expiresAt: Date;
	account: AccountModelId;
	secret: string;
	redirectPath: string | null;
}
