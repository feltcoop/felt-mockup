import {ModelId} from '../db/Model.js';

export type CommunityModelId = ModelId<CommunityModel>;

export interface CommunityModel {
	id: CommunityModelId;
	name: string;
}
