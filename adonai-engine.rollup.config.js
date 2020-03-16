import { terser } from "rollup-plugin-terser";

const defaults = {
	name: 'engine',
	format: 'es'
};

export default {
	input: './source/main.js',
	output: [
		{
			...defaults,
			file: './build/adonai-engine.js',
			plugins: []
		},	
		{
			...defaults,
			file: './build/adonai-engine.min.js',
			plugins: [
				terser()
			]
		}
	]
};
