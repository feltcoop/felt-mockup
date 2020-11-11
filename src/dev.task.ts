import {Task} from '@feltcoop/gro';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';
import {CachingCompiler} from '@feltcoop/gro/dist/compile/CachingCompiler.js';
import {createCompileFile} from '@feltcoop/gro/dist/compile/compileFile.js';

import {copyIgnoredBuildFiles} from './project/dev/copyIgnoredBuildFiles.js';

/*

Felt's build process currently composes a TypeScript compiler using `swc`,
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
		await invokeTask('compile');
		await copyIgnoredBuildFiles(log, true);

		const cachingCompiler = new CachingCompiler({compileFile: createCompileFile(log)});

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
			cachingCompiler.init(),
		]);
	},
};
