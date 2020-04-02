import { entries } from '../utilities/objects';

export const plugins = {};

export const configure = (options) => {
    for (const [plugin, option] of entries(options)) {
        plugins[plugin](option);
    }
};