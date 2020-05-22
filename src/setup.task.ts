import {Task} from '@feltcoop/gro';
import {copy, pathExists} from '@feltcoop/gro/dist/fs/nodeFs.js';

export const task: Task = {
	description: 'performs initial project setup',
	run: async ({log}): Promise<void> => {
		if (await pathExists('.env')) {
			log.info('.env already exists - skipping its copy step');
		} else {
			log.info('copying initial .env to root');
			await copy('src/project/setup/.env.sample', '.env');
		}
	},
};
