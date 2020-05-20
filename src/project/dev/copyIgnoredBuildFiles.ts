import {
	paths,
	basePathToSourceId,
	basePathToBuildId,
} from '@feltcoop/gro/dist/paths.js';
import {watchNodeFs, WatcherChange} from '@feltcoop/gro/dist/fs/watchNodeFs.js';
import {copy, remove} from '@feltcoop/gro/dist/fs/nodeFs.js';
import {printPath} from '@feltcoop/gro/dist/utils/print.js';
import {UnreachableError} from '@feltcoop/gro/dist/utils/error.js';
import {Logger} from '@feltcoop/gro/dist/utils/log';

const isFileIgnoredByCurrentBuild = (path: string): boolean =>
	path.endsWith('.svelte') || path.endsWith('.html');

/*

We currently defer compilation of Svelte and TypeScript
to existing build processes using Rollup and `tsc`.
This helper is used to bridge the gap by moving uncompiled Svelte and HTML
to the `build/` directory so Sapper can treat it as `src/`.

*/
export const copyIgnoredBuildFiles = async (
	log: Logger,
	watch: boolean,
): Promise<void> => {
	const {init, dispose} = watchNodeFs({
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

	if (!watch) dispose();
};
