import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import {terser} from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import {builtinModules} from 'module';

import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const onwarn = (warning, onwarn) =>
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);
const dedupe = (importee) => importee === 'svelte' || importee.startsWith('svelte/');

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe,
			}),
			commonjs(),

			!dev &&
			terser({
				module: true,
			}),
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: {...config.server.output(), format: 'esm'},
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				generate: 'ssr',
				hydratable: true,
				dev,
			}),
			resolve({
				dedupe,
			}),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(builtinModules),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			commonjs(),
			!dev && terser(),
		],

		onwarn,
	},
};
