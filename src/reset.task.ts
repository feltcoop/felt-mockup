import {Task} from '@feltcoop/gro';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

import {copyIgnoredBuildFiles} from './project/dev/copyIgnoredBuildFiles.js';

export const task: Task = {
	description: 'resets the local development environment to its initial ready state',
	run: async ({log, invokeTask}): Promise<void> => {
		// ensure all dependencies are installed
		await spawnProcess('npm', ['install']);

		// rebuild everything
		await invokeTask('clean');
		log.info('compiling TypeScript');
		await spawnProcess('node_modules/.bin/tsc');
		await copyIgnoredBuildFiles(log, false);

		// set up the database, clearing all data and running all migrations
		await invokeTask('db/create');
	},
};
