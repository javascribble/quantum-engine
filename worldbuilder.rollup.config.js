import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';

const editor = './editor/main.js';
const engine = './engine/main.js';
const math = './plugins/math/exports.js';
const webgpu = './plugins/webgpu/exports.js';
const webaudio = './plugins/webaudio/exports.js';
const bundles = [
	{ name: '.engine', input: [engine, math, webaudio, webgpu] },
	{ name: '.editor', input: [editor, engine, math, webaudio, webgpu] }
];

const output = (name, plugins = []) => ({
	file: `./build/worldbuilder${name}.js`,
	name: 'engine',
	format: 'iife',
	plugins
});

const development = (bundle) => [output(bundle.name)];
const production = (bundle) => [...development(bundle), output(`${bundle.name}.min`, [terser()])];

const debug = process.argv.includes('-w');
export default bundles.map(bundle => {
	return {
		input: bundle.input,
		output: debug ? development(bundle) : production(bundle),
		plugins: [
			multi()
		]
	}
});