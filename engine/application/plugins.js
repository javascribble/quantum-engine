import { assign } from '../utilities/objects';

export const plugins = {};

export const configurePlugins = (options) => assign(plugins, options);