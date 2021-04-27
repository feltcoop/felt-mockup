const {typescript} = require('svelte-preprocess-esbuild');
const {postcss} = require('svelte-preprocess');
const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');
const postcssConfig = require('./postcss.config.cjs');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: [postcss(postcssConfig), typescript()],
	kit: {
		adapter: staticAdapter(),
		target: '#svelte',
		appDir: 'app', // because _app is ignored by GitHub pages by default
		files: {assets: 'src/static'},
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
		},
	},
};
