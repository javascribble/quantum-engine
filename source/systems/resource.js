export const createResourceSystem = async (api, options, createEntity, deleteEntity) => {
    const { } = api;
    const { } = options;

    const { resources, resourceRoot } = options;
    const resourcePaths = resources.map(resource => `${resourceRoot}/${resource}`);
    const activeResources = [resources.length]; // TODO: Cache invalidation.

    api.resources = activeResources;
    api.loadResources = async indices => {
        const loadedResources = await api.loadMany(indices.map(index => resourcePaths[index]));
        for (let i = 0; i < loadedResources.length; i++) {
            activeResources[indices[i]] = loadedResources[i];
        }
    };

    return {
        update: (delta, elapsed) => {
        },
        validate: entity => {
        },
        add: entity => {
        },
        replace: entity => {
        },
        remove: entity => {
        }
    }
};