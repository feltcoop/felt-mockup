import {join} from 'path';
import {
	paths as defaultPaths,
	basePathToSourceId,
} from '@feltcoop/gro/dist/paths.js';

const db = basePathToSourceId('db/');

export const paths = {
	...defaultPaths,
	db,
	dbMigrations: join(db, 'migrations/'),
	dbMigrationStub: join(db, 'helpers/migrationStub.ts'),
};
