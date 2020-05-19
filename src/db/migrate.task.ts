import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex} from './obtainKnex.js';
import {getMigrationConfigWithCustomSource} from './getKnexMigrationConfig.js';

export const task: Task = {
	description: 'run all migrations',
	run: async () => {
		const [knex, releaseKnex] = obtainKnex();

		const migrationConfig = getMigrationConfigWithCustomSource();

		await knex.migrate.latest(migrationConfig);

		releaseKnex();
	},
};
