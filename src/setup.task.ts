import dotenv from 'dotenv';
import {Task} from '@feltcoop/gro';
import {copy, pathExists} from '@feltcoop/gro/dist/fs/nodeFs.js';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

export const task: Task = {
	description: 'performs initial project setup',
	run: async ({log}): Promise<void> => {
		if (await pathExists('.env')) {
			log.info('.env already exists - skipping its copy step');
		} else {
			log.info('copying initial .env to root');
			await copy('src/project/setup/.env.sample', '.env');
		}

		if (!process.env.CI) {
			dotenv.config();
			const {DB_NAME, DB_USER, DB_PASS} = process.env;
			if (!DB_NAME) throw Error(`Expected environment variable DB_NAME`);
			if (!DB_USER) throw Error(`Expected environment variable DB_USER`);
			if (!DB_PASS) throw Error(`Expected environment variable DB_PASS`);
			process.env.PGPASSWORD = DB_PASS;
			// process.env.POSTGRES_HOST = 'localhost';
			// process.env.POSTGRES_PORT = '5432';
			const spawnOptions = {env: process.env};
			await spawnProcess(
				`psql`,
				['-c', `CREATE DATABASE ${DB_NAME};`, '-U', DB_USER, '-w'],
				spawnOptions,
			);
			// TODO what's the right way to do this?
			// there's currently a contradiction about setting up the user and password
			// what does a fresh setup with no existing database look like?
			// maybe we need to split the admin db user/password from the app user/password?
			await spawnProcess(
				`psql`,
				['-c', `CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';`, '-U', DB_USER, '-w'],
				spawnOptions,
			);
			await spawnProcess(
				`psql`,
				['-c', `ALTER ROLE ${DB_USER} WITH PASSWORD '${DB_PASS}';`, '-U', DB_USER, '-w'],
				spawnOptions,
			);
		}
	},
};
