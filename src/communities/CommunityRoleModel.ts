import {ModelId} from '../db/Model.js';
import {CommunityModelId} from './CommunityModel.js';

export type CommunityRoleModelId = ModelId<CommunityRoleModel>;

export interface CommunityRoleModel {
	id: CommunityRoleModelId;
	community: CommunityModelId;
	name: string;
	permissions: any; // TODO  !!!!!!!!  !!!!!!!!
}
