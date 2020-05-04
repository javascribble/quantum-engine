export const plugins = new Set();

export const startPlugins = async (options) => {
    for (const plugin of plugins) {
        await plugin.start(options);
    }
};

export const stopPlugins = async () => {
    for (const plugin of plugins.reverse()) {
        await plugin.stop();
    }
};