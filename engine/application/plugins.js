import { animations } from './animation.js';

const plugins = new Set();

export const register = (plugin) => {
    if (plugin.add && plugin.delete) {
        systems.add(plugin);
    }

    if (plugin.update) {
        animations.add(plugin);
    }

    // connect options to plugin load event.
};

export const configure = (options) => {
    // call load on plugins.
};