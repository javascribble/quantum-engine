import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';

const editor = './editor/main.js';
const engine = './engine/main.js';
const plugins = './plugins/main.js';
const bundles = [
	{ name: 'engine', input: [engine, plugins] },
	{ name: 'editor', input: [editor] }
];

const output = (name, plugins = []) => ({
	file: `./build/whitestone.${name}.js`,
	format: 'iife',
	plugins,
	name
});

const development = (bundle) => [output(bundle.name)];
const production = (bundle) => [...development(bundle), output(`${bundle.name}.min`, [terser()])];

const debug = process.argv.includes('-w');
export default bundles.map(bundle => {
	return {
		input: bundle.input,
		output: debug ? development(bundle) : production(bundle),
		plugins: [multi()]
	}
});