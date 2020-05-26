import {ModelId} from '../db/Model.js';

export interface AccountModel {
	id: ModelId;
	email: string;
}

// TODO see `src/db/Model.ts` for discussion about what the right abstraction is for "models"
