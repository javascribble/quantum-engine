export const adapters = new Map();
export const plugins = new Map();

const createInstances = collection => {
    const instances = new Map();
    for (const [name, value] of collection) {
        instances.set(name, new value());
    }

    return instances;
};

export const createAdapters = () => createInstances(adapters);
export const createPlugins = () => createInstances(plugins);