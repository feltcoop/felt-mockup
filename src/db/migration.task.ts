import {Task} from '@feltcoop/gro/dist/task/task.js';
import {printPath} from '@feltcoop/gro/dist/utils/print.js';

import {obtainKnex} from './obtainKnex.js';
import {getMigrationConfigWithDefaultSource} from './getKnexMigrationConfig.js';

export const task: Task = {
	description: 'create a new migration',
	run: async ({log, args}) => {
		const {
			_: [migrationName],
		} = args;
		if (!migrationName) {
			throw Error('Task "migration" requires a migration name argument: `gro migration <name>`.');
		}
		if (typeof migrationName !== 'string') {
			throw Error(
				`Migration name should be a string not ${typeof migrationName}, "${migrationName}".`,
			);
		}

		const [knex, releaseKnex] = obtainKnex();

		const migratorConfig = getMigrationConfigWithDefaultSource();

		const newMigrationPath = await knex.migrate.make(migrationName, migratorConfig);
		log.info('created migration', printPath(newMigrationPath));

		releaseKnex();
	},
};
