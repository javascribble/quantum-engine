export const initializeResources = async (api, options) => {
    const { systems, loadOne, loadMany } = api;
    const { resources, resourceRoot } = options;

    const paths = resources.map(resource => `${resourceRoot}/${resource}`);
    const cache = [resources.length]; // TODO: Use a global cache.

    systems.push({
        validate: entity => entity.hasOwnProperty('resources'),
        add: async entity => {
            entity.resources = await loadMany(entity.resources.map(index => paths[index]));
        },
        remove: entity => {
            // TODO: Cache invalidation.
        }
    });
};