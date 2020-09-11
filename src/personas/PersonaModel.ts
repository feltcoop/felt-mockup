import {ModelId} from '../db/Model.js';
import {AccountModelId} from '../accounts/AccountModel.js';

export type PersonaModelId = ModelId<PersonaModel>;

export interface PersonaModel {
	id: PersonaModelId;
	account: AccountModelId;
	name: string;
}
