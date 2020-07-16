import {Task} from '@feltcoop/gro';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

import {copyIgnoredBuildFiles} from './project/dev/copyIgnoredBuildFiles.js';

/*

Felt's build process currently composes TypeScript's compiler,
Sapper, and a small utility to glue them together via the `build/` directory.

TypeScript is compiled to `build/`,
other files like Svelte and HTML are copied to it,
and then Sapper is pointed to `build/` instead of its normal `src/`.

This writes to disk more than needed and it's more complex than
doing everything through Rollup, but it gives us more flexibility in the future
to take advantage of tools that provide big dev-time benefits.
(e.g. Snowpack, esbuild, etc)

*/
export const task: Task = {
	description: 'builds the project for development and watches for changes',
	run: async ({log, invokeTask}): Promise<void> => {
		await spawnProcess('node_modules/.bin/tsc', ['--preserveWatchOutput']);

		await Promise.all([copyIgnoredBuildFiles(log, true), invokeTask('db/migrate')]);

		log.info('starting Sapper and the TypeScript compiler in watch mode');
		await Promise.all([
			spawnProcess('node_modules/.bin/sapper', [
				'dev',
				'--src',
				'build',
				'--routes',
				'build/routes',
				'--output',
				'build/node_modules/@sapper',
			]),
			spawnProcess('node_modules/.bin/tsc', ['-w', '--preserveWatchOutput']),
		]);
	},
};
