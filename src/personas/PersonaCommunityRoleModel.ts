import {ModelId} from '../db/Model.js';
import {PersonaModelId} from './PersonaModel.js';
import {CommunityRoleModelId} from '../communities/CommunityRoleModel.js';

export type PersonaCommunityRoleModelId = ModelId<PersonaCommunityRoleModel>;

export interface PersonaCommunityRoleModel {
	id: PersonaCommunityRoleModelId;
	persona: PersonaModelId;
	communityRole: CommunityRoleModelId;
}
