import dotenv from 'dotenv';
import {Task} from '@feltcoop/gro';
import {copy, pathExists} from '@feltcoop/gro/dist/fs/nodeFs.js';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

export const task: Task = {
	description: 'performs initial project setup',
	run: async (ctx): Promise<void> => {
		const {log} = ctx;

		// copy a fresh `.env` to the root if one doesn't already exist
		if (await pathExists('.env')) {
			log.info('.env already exists - skipping its copy step');
		} else {
			log.info('copying initial .env to root');
			await copy('src/project/setup/.env.sample', '.env');
		}

		// set up the database - the first two are no-ops if they already exist
		dotenv.config();
		const {DB_NAME, DB_USER, DB_PASS} = process.env;
		if (!DB_NAME) throw Error(`Expected environment variable DB_NAME`);
		if (!DB_USER) throw Error(`Expected environment variable DB_USER`);
		if (!DB_PASS) throw Error(`Expected environment variable DB_PASS`);
		process.env.PGPASSWORD = DB_PASS; // this is read by `psql`
		await spawnProcess(`psql`, ['-c', `CREATE DATABASE ${DB_NAME};`, '-U', 'postgres', '-w']);
		await spawnProcess(`psql`, [
			'-c',
			`CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASS}';`,
			'-U',
			'postgres',
			'-w',
		]);
		await spawnProcess(`psql`, [
			'-c',
			`ALTER ROLE ${DB_USER} WITH PASSWORD '${DB_PASS}';`,
			'-U',
			'postgres',
			'-w',
		]);

		// create the database's schema and seed it
		const {task: createDbTask} = await import('./db/create.task.js');
		await createDbTask.run(ctx);
	},
};
