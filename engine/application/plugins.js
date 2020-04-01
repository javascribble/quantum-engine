import { entries } from '../utilities/objects';

export const plugins = {};

export const configure = (plugins) => {
    for (const [plugin, options] of entries(plugins)) {
        plugins[plugin](options);
    }
};