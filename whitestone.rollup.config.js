import { terser } from "rollup-plugin-terser";
import multi from '@rollup/plugin-multi-entry';

const bundles = [
	{ name: 'engine', input: ['./editor/main.js'] },
	{ name: 'editor', input: ['./engine/main.js'] },
	{ name: 'plugins', input: ['./plugins/main.js'] },	
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
	plugins: [multi()]
}));