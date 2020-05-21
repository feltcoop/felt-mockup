import {Task} from '@feltcoop/gro/dist/task/task.js';

import {obtainKnex} from './obtainKnex.js';
import {getKnexConnectionConfig} from './getKnexConnectionConfig.js';

export const task: Task = {
	description: 'destroy the schema and delete all data',
	run: async () => {
		const [knex, unobtainKnex] = obtainKnex();

		// We aren't using `down` migrations yet, if ever,
		// so we just recreate the db from scratch directly
		// instead of calling into knex's migrate API.
		const config = getKnexConnectionConfig();
		await knex.raw(`
			DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
			ALTER SCHEMA public OWNER to postgres;
			GRANT ALL ON SCHEMA public TO postgres;
			GRANT ALL ON SCHEMA public TO ${config.user};
			GRANT ALL ON SCHEMA public TO public;
		`);

		unobtainKnex();
	},
};
