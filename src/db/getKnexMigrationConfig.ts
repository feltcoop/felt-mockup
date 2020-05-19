import {MigratorConfig, MigrationSource} from 'knex';
import {resolve, join} from 'path';
import {readdirSync} from 'fs';
import {toBuildId} from '@feltcoop/gro/dist/paths.js';

import {paths} from '../paths.js';

/*

We're using Knex's programmatic migration API instead of its CLI
for better integration with TypeScript, ES modules, and our other tasks.

When running Knex migrations, we need to target the build directory,
but when creating migrations, we need to target the source directory.
In the first case, we provide a custom migration source object to Knex
to fix the fact that it doesn't work with ES modules outside of a CLI flag,
and in the latter case we default to its default filesystem migration source.

*/

export const getMigrationConfigWithCustomSource = (): MigratorConfig => {
	return {
		// database: , // ?: string;

		// Because we're providing `migrationSource`,
		// we cannot define any properties related to the filesystem,
		// because if Knex sees any of these it sets `migrationSource` to `null`
		// in `node_modules/knex/lib/migrate/configuration-merger.js`.
		// directory: `${baseDir}/db/migrations`, // ?: string | readonly string[];
		// extension: 'ts', // ?: string;

		// stub: , // ?: string;
		// tableName: , // ?: string;
		// schemaName: , // ?: string;
		// disableTransactions: , // ?: boolean;
		// disableMigrationsListValidation: , // ?: boolean;
		// sortDirsSeparately: , // ?: boolean;
		// loadExtensions: , // ?: readonly string[];
		migrationSource: createMigrationSource(toBuildId(paths.dbMigrations)), // ?: any;
	};
};

export const getMigrationConfigWithDefaultSource = (): MigratorConfig => {
	return {
		// database: , // ?: string;
		directory: paths.dbMigrations, // ?: string | readonly string[];
		extension: 'ts', // ?: string;
		stub: paths.dbMigrationStub, // ?: string;
		// tableName: , // ?: string;
		// schemaName: , // ?: string;
		// disableTransactions: , // ?: boolean;
		// disableMigrationsListValidation: , // ?: boolean;
		// sortDirsSeparately: , // ?: boolean;
		// loadExtensions: , // ?: readonly string[];
		// migrationSource, // ?: any;
	};
};

interface MigrationFile {
	file: string; // file name without any directory information
	directory: string; // relative path to migrations directory
}

const createMigrationSource = (
	relativeDir: string,
): MigrationSource<MigrationFile> => {
	const absoluteDir = resolve(relativeDir);
	const modules = new Map();
	return {
		getMigrations: async () => {
			// These need to be sorted by name,
			// and they should be by default without additional sorting.
			const migrationFileNames = readdirSync(absoluteDir);
			migrationFileNames.sort((a, b) => (a > b ? 1 : -1));
			await Promise.all(
				migrationFileNames.map(async fileName => {
					const mod = await import(join(absoluteDir, fileName));
					modules.set(fileName, mod);
				}),
			);
			return migrationFileNames.map(file => ({file, directory: relativeDir}));
		},
		getMigrationName: migration => migration.file,
		getMigration: migration => ({
			up: modules.get(migration.file).up,
			down: async () => {},
		}),
	};
};
