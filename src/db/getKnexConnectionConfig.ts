import {PgConnectionConfig} from 'knex';

import {getEnv} from '../project/env.js';

type KnexConnectionConfig = PartialExcept<
	Readonly<Required<PgConnectionConfig>>,
	'database' | 'user' | 'password' | 'host' | 'port'
>;

export const getKnexConnectionConfig = (): KnexConnectionConfig => {
	const {DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT} = getEnv();
	if (!DB_NAME) {
		throw Error(`Missing envrionment variable "DB_NAME"`);
	}
	if (!DB_USER) {
		throw Error(`Missing envrionment variable "DB_USER"`);
	}
	if (!DB_PASS) {
		throw Error(`Missing envrionment variable "DB_PASS"`);
	}
	if (!DB_HOST) {
		throw Error(`Missing envrionment variable "DB_HOST"`);
	}
	return {
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASS,
		host: DB_HOST,
		port: Number(DB_PORT) || 5432,
	};
};
