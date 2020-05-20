import createKnex from 'knex';
import {createObtainable} from '@feltcoop/gro/dist/utils/createObtainable.js';

import {getKnexConnectionConfig} from './getKnexConnectionConfig.js';

export type KnexInstance = createKnex<any, unknown[]>;

export const obtainKnex = createObtainable(
	(): KnexInstance => {
		const knex = createKnex({
			client: 'pg',
			connection: getKnexConnectionConfig(),
			pool: {
				min: 2,
				max: 10,
			},
			migrations: {
				tableName: 'knex_migrations',
			},
		});
		return knex;
	},
	(knex) => knex.destroy(),
);
