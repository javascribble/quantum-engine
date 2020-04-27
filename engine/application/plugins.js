import { entries } from '../utilities/objects';

export const plugins = new Map();

export const startPlugins = async (options) => {
    for (const [plugin, option] of entries(options)) {
        await plugins.get(plugin).start(option);
    }
};

export const stopPlugins = async () => {
    for (const plugin of plugins.values().reverse()) {
        await plugin.stop();
    }
};