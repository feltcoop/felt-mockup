import {join} from 'path';
import {paths as defaultPaths} from '@feltcoop/gro/dist/paths.js';

const db = join(defaultPaths.source, 'db/');
const sapper = join(defaultPaths.root, '__sapper__/');

export const paths = {
	...defaultPaths,
	db,
	dbMigrations: join(db, 'migrations/'),
	dbMigrationStub: join(db, 'helpers/migrationStub.ts'),
	static: join(defaultPaths.root, 'static/'),
	sapper,
	sapperBuild: join(sapper, 'build/'),
};
