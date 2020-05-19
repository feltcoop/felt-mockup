import {KnexInstance} from '../obtainKnex.js';

export const up = async (knex: KnexInstance): Promise<void> => {
	await knex;
};
