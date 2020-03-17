import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';

const mainInputFile = './source/main.js';
const webglInputFile = './plugins/webgl/exports.js';
const webgpuInputFile = './plugins/webgpu/exports.js';
const webaudioInputFile = './plugins/webaudio/exports.js';
const bundles = [
	{ extension: '', input: mainInputFile },
	{ extension: '.webgl', input: [mainInputFile, webaudioInputFile, webglInputFile] },
	{ extension: '.webgpu', input: [mainInputFile, webaudioInputFile, webgpuInputFile] }
];

const outputFile = './build/adonai-engine';
const output = (extension, plugins = []) => ({
	file: `${outputFile}${extension}.js`,
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