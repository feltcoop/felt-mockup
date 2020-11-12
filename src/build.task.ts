import {Task} from '@feltcoop/gro';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

import {copyIgnoredBuildFiles} from './project/dev/copyIgnoredBuildFiles.js';

/*

This task builds the app for production.
It mirrors `./dev.task.ts` in many ways with some important differences -
mainly, it does nothing in watch mode,
and in the future there will be more divergence,
perhaps using completely different tools to improve the dev experience.

*/
export const task: Task = {
	description: 'builds everything for production',
	run: async ({log, invokeTask}): Promise<void> => {
		await invokeTask('compile');
		await copyIgnoredBuildFiles(log, false);

		log.info('building sapper');
		await spawnProcess('node_modules/.bin/sapper', [
			'build',
			'--src',
			'build',
			'--routes',
			'build/routes',
			'--output',
			'build/node_modules/@sapper',
		]);
	},
};
