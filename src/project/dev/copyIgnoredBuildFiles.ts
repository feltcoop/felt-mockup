import {paths, basePathToSourceId, basePathToBuildId} from '@feltcoop/gro/dist/paths.js';
import {watchNodeFs} from '@feltcoop/gro/dist/fs/watchNodeFs.js';
import {copy, remove} from '@feltcoop/gro/dist/fs/nodeFs.js';
import {printPath} from '@feltcoop/gro/dist/utils/print.js';
import {UnreachableError} from '@feltcoop/gro/dist/utils/error.js';
import {Logger} from '@feltcoop/gro/dist/utils/log';

const isFileIgnoredByCurrentBuild = (path: string): boolean =>
	path.endsWith('.svelte') || path.endsWith('.html');

/*

We currently defer compilation of Svelte and TypeScript
to existing build processes using Rollup and `tsc`/`swc`.
This helper is used to bridge the gap by moving uncompiled Svelte and HTML
to the `build/` directory so Sapper can treat it as `src/`.

*/
export const copyIgnoredBuildFiles = async (log: Logger, watch: boolean): Promise<void> => {
	const watcher = watchNodeFs({
		dir: paths.source,
		onChange: async (change, path, stats) => {
			switch (change) {
				case 'create': {
					if (isFileIgnoredByCurrentBuild(path)) {
						log.trace('created and copying', printPath(path));
						await copy(basePathToSourceId(path), basePathToBuildId(path));
					}
					break;
				}
				case 'update': {
					if (isFileIgnoredByCurrentBuild(path)) {
						log.trace('updated and copying', printPath(path));
						await copy(basePathToSourceId(path), basePathToBuildId(path));
					}
					break;
				}
				case 'delete': {
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
	const watcherPaths = await watcher.init();

	log.trace(`init file watcher with ${watcherPaths.size} paths`);
	await Promise.all(
		Array.from(watcherPaths.keys()).map((path) => {
			if (!isFileIgnoredByCurrentBuild(path)) return null;
			log.trace('copying', printPath(path));
			return copy(basePathToSourceId(path), basePathToBuildId(path));
		}),
	);

	if (!watch) watcher.destroy();
};
