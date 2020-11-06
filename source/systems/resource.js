export const createResourceSystem = async (api, options, createEntity, deleteEntity) => {
    const { loadOne, loadMany } = api;
    const { resources, resourceRoot } = options;

    const paths = resources.map(resource => `${resourceRoot}/${resource}`);
    const cache = [resources.length]; // TODO: Cache invalidation.

    api.loadResource = async index => cache[index] = await loadOne(paths[index]);
    api.loadResources = async indices => (await loadMany(indices.map(index => paths[index]))).forEach((file, index) => cache[index] = file);
    api.resources = cache;

    return {
        update: (delta, elapsed) => {
        },
        validate: entity => {
        },
        add: entity => {
        },
        remove: entity => {
        }
    }
};