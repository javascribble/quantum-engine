export const getBridge = (adapters, plugins) => {
    const bridge = {};
    for (const [name, adapter] of adapters) bridge[name] = adapter.bridge;
    for (const [name, plugin] of plugins) bridge[name] = plugin.bridge;
    return bridge;
};