import { methods } from '../constants/interface.js';

export const integratePlugin = (api, plugin) => {
    for (const method of methods) {
        if (plugin.hasOwnProperty(method)) {
            api[method] = plugin[method].bind(plugin);
        }
    }
};

export const disintegratePlugin = (api, plugin) => {
    for (const method of methods) {
        if (plugin.hasOwnProperty(method)) {
            delete api[method];
        }
    }
};