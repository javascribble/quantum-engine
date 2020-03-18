import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';

const main = './source/main.js';
const math = './plugins/math/exports.js';
const webgl = './plugins/webgl/exports.js';
const webgpu = './plugins/webgpu/exports.js';
const webaudio = './plugins/webaudio/exports.js';
const bundles = [
	{ extension: '', input: main },
	{ extension: '.webgl', input: [main, math, webaudio, webgl] },
	{ extension: '.webgpu', input: [main, math, webaudio, webgpu] }
];

const output = (extension, plugins = []) => ({
	file: `./build/adonai-engine${extension}.js`,
	name: 'engine',
	format: 'iife',
	plugins
});

const development = (bundle) => [output(bundle.extension)];
const production = (bundle) => [...development(bundle), output(`${bundle.extension}.min`, [terser()])];

const debug = process.argv.includes('-w');
export default bundles.map(bundle => {
	return {
		input: bundle.input,
		output: debug ? development(bundle) : production(bundle),
		plugins: [multi()]
	}
});