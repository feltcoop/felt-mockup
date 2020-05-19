import {Task} from '@feltcoop/gro';
import {spawnProcess} from '@feltcoop/gro/dist/utils/process.js';

import {task as devTask} from './dev.task.js';

export const task: Task = {
	description: 'builds everything for production',
	run: async (ctx): Promise<void> => {
		const {log} = ctx;

		log.info('compiling typescript');
		await spawnProcess('node_modules/.bin/tsc');

		await devTask.run({...ctx, args: {...ctx.args, watch: false}});

		log.info('building sapper');
		await spawnProcess('node_modules/.bin/sapper', [
			'build',
			'--src',
			'build',
			'--routes',
			'build/routes',
			'--output',
			'build/node_modules/@sapper',
		]);
	},
};
