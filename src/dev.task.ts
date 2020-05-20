import {Task} from '@feltcoop/gro';
import {
	paths,
	basePathToSourceId,
	basePathToBuildId,
} from '@feltcoop/gro/dist/paths.js';
import {watchNodeFs, WatcherChange} from '@feltcoop/gro/dist/fs/watchNodeFs.js';
import {copy, remove} from '@feltcoop/gro/dist/fs/nodeFs.js';
import {printPath} from '@feltcoop/gro/dist/utils/print.js';
import {UnreachableError} from '@feltcoop/gro/dist/utils/error.js';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

/*

This task is part of Felt's work-in-progress build process.
We currently defer compilation of Svelte and TypeScript
to existing build processes using Rollup and `tsc`.

Eventually, this task will be the sole entrypoint
for building Felt in development.
To bridge the target process and the current one,
this dev task copies certain files to `build/` in watch mode,
treating `build/` as the old `src/` in the current build tools.

*/

const isFileIgnoredByCurrentBuild = (path: string): boolean =>
	path.endsWith('.svelte') || path.endsWith('.html');

export const task: Task = {
	description: 'builds the project for development and watches for changes',
	run: async ({log}): Promise<void> => {
		const {init} = watchNodeFs({
			dir: paths.source,
			onInit: async paths => {
				log.trace(`init file watcher with ${paths.size} paths`);
				await Promise.all(
					Array.from(paths.keys()).map(path => {
						if (!isFileIgnoredByCurrentBuild(path)) return null;
						log.trace('copying', printPath(path));
						return copy(basePathToSourceId(path), basePathToBuildId(path));
					}),
				);
			},
			onChange: async (change, path, stats) => {
				switch (change) {
					case WatcherChange.Create: {
						if (isFileIgnoredByCurrentBuild(path)) {
							log.trace('created and copying', printPath(path));
							await copy(basePathToSourceId(path), basePathToBuildId(path));
						}
						break;
					}
					case WatcherChange.Update: {
						if (isFileIgnoredByCurrentBuild(path)) {
							log.trace('updated and copying', printPath(path));
							await copy(basePathToSourceId(path), basePathToBuildId(path));
						}
						break;
					}
					case WatcherChange.Delete: {
						if (isFileIgnoredByCurrentBuild(path) || stats.isDirectory()) {
							log.trace('deleted and removing', printPath(path));
							await remove(basePathToBuildId(path));
						}
						break;
					}
					default: {
						throw new UnreachableError(change);
					}
				}
			},
		});
		await init;

		log.info('starting sapper');
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
