import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';
import resolve from '@rollup/plugin-node-resolve';

const bundles = [
	{ name: 'editor', input: ['./editor/main.js', './engine/main.js', './plugins/main.js'] },
	{ name: 'engine', input: ['./engine/main.js', './plugins/main.js'] }
];

const output = (name, plugins = []) => ({
	file: `./build/whitestone.${name}.js`,
	format: 'es',
	plugins,
	name
});

const development = (bundle) => [output(bundle.name)];
const production = (bundle) => [...development(bundle), output(`${bundle.name}.min`, [terser()])];

const debug = process.argv.includes('-w');
export default bundles.map(bundle => ({
	input: bundle.input,
	output: debug ? development(bundle) : production(bundle),
	plugins: [
		multi(),
		resolve()
	]
}));