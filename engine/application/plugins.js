import { entries } from '../utilities/objects';

export const plugins = {};

export const configure = async (options) => {
    for (const [plugin, option] of entries(options)) {
        await plugins[plugin](option);
    }
};